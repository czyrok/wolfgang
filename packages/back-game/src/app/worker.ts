import http from "http";
import { connect } from "mongoose";
import { Server } from "socket.io";
import { instanceToPlain } from "class-transformer";
import { SocketIoController } from "ts-socket.io-controller";
import {
  ConfigAppHelper,
  LogUtil,
  LogHelper,
  TypeLogEnum,
  EnvUtil,
  VarEnvEnum,
  GameModel,
  ScopeIoMiddleware,
  SessionIoMiddleware,
} from "common";

import { GameController } from "./game/controller/game.controller";

async function run(): Promise<void> {
  LogUtil.config = LogHelper.getConfig(
    TypeLogEnum.APP,
    TypeLogEnum.GAME,
    TypeLogEnum.LOG_IN,
    TypeLogEnum.ACCESS
  );

  LogUtil.logger(TypeLogEnum.APP).trace("New game created");

  await connect(
    `mongodb://${EnvUtil.get(VarEnvEnum.DB_URL)}:${EnvUtil.get(
      VarEnvEnum.DB_PORT
    )}/wolfgang`,
    {
      authSource: "admin",
      user: EnvUtil.get(VarEnvEnum.DB_USER),
      pass: EnvUtil.get(VarEnvEnum.DB_PW),
    }
  );

  LogUtil.logger(TypeLogEnum.APP).trace("Database connection initialized");

  const io: Server = ConfigAppHelper.setup({
    port: parseInt(EnvUtil.get(VarEnvEnum.GAME_PORT)),
    cors: {
      origin: `${EnvUtil.get(VarEnvEnum.PROTOCOL)}://${EnvUtil.get(
        VarEnvEnum.CORS_WEBSITE_URL
      )}`,
      credentials: true,
    },
    session: true,
  });

  SocketIoController.useSocketIoServer(io, {
    controllers: [GameController],
    middlewares: [SessionIoMiddleware, ScopeIoMiddleware],
    useClassTransformer: true,
  });

  LogUtil.logger(TypeLogEnum.APP).trace("Socket engine initialized");

  const game: GameModel = GameModel.instance;

  game.onStateChange((game: GameModel) => {
    if (process.send) process.send(instanceToPlain(game));
  });

  process.on("message", (msg: any) => {
    if (msg.cmd === "getGameData") {
      if (process.send) process.send(instanceToPlain(game));
    }
  });

  game.creationCode = process.env["CREATION_CODE"] as string;

  LogUtil.logger(TypeLogEnum.APP).info(
    `Initialized game: "{ gameId: "${game.gameId}", creationCode: "${game.creationCode}" }"`
  );
}

run().catch((error: Error) => {
  LogUtil.logger(TypeLogEnum.APP).fatal(error.message);
});
