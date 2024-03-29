import { connect } from "mongoose";
import { Server } from "socket.io";
import { SocketIoController } from "ts-socket.io-controller";
import {
  LogUtil,
  LogHelper,
  SessionIoMiddleware,
  ScopeIoMiddleware,
  AdminScopeIoMiddleware,
  ConfigAppHelper,
  TypeLogEnum,
  EnvUtil,
  VarEnvEnum,
  TestScopeIoMiddleware,
  PlayScopeIoMiddleware,
  ReportScopeIoMiddleware,
} from "common";

import { AuthController } from "./auth/controller/auth.controller";
import { LogInHomeController } from "./home/log-in/controller/log-in.home.controller";
import { SignUpHomeController } from "./home/sign-up/controller/sign-up.home.controller";
import { CurrentlyGameController } from "./game/currently/controller/currently.game.controller";
import { CardsProposalGameController } from "./game/cards-proposal/controller/cards-proposal.game.controller";
import { ViewCardsProposalGameController } from "./game/cards-proposal/view/controller/view.cards-proposal.game.controller";
import { ProfileGameController } from "./game/profile/controller/profile.game.controller";
import { ReportManagingController } from "./managing/report/controller/report.managing.controller";
import { ReportController } from "./report/controller/report.controller";
import { SkinCustomizationProfileGameController } from "./game/profile/skin-customization/controller/skin-customization.profile.game.controller";
import { GameController } from "./game/controller/game.controller";
import { PlayController } from "./play/controller/play.controller";
import { ViewReportManagingController } from "./managing/report/view/controller/view.report.managing.controller";

async function run(): Promise<void> {
  LogUtil.config = LogHelper.getConfig(
    TypeLogEnum.APP,
    TypeLogEnum.LOG_IN,
    TypeLogEnum.ACCESS
  );

  LogUtil.logger(TypeLogEnum.APP).trace("App started");

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
    port: parseInt(EnvUtil.get(VarEnvEnum.MAIN_PORT)),
    cors: {
      origin: `${EnvUtil.get(VarEnvEnum.PROTOCOL)}://${EnvUtil.get(
        VarEnvEnum.CORS_WEBSITE_URL
      )}`,
      credentials: true,
    },
    session: true,
  });

  SocketIoController.useSocketIoServer(io, {
    controllers: [
      AuthController,
      LogInHomeController,
      SignUpHomeController,
      CurrentlyGameController,
      ProfileGameController,
      SkinCustomizationProfileGameController,
      CardsProposalGameController,
      ViewCardsProposalGameController,
      ReportManagingController,
      ReportController,
      GameController,
      PlayController,
      ViewReportManagingController,
    ],
    middlewares: [
      SessionIoMiddleware,
      TestScopeIoMiddleware,
      ScopeIoMiddleware,
      AdminScopeIoMiddleware,
      PlayScopeIoMiddleware,
      ReportScopeIoMiddleware,
    ],
    useClassTransformer: true,
  });

  LogUtil.logger(TypeLogEnum.APP).trace("Socket engine initialized");
}

run().catch((error: Error) => {
  LogUtil.logger(TypeLogEnum.APP).fatal(error.message);
});
