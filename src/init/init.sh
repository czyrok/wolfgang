for filename in src/init/script/*.js; do
    NODE_ENV=$1 node --unhandled-rejections=strict $filename
done