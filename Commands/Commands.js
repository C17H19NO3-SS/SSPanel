export default {
    0: {
        env: {
            arg1: "whoami",
        },
        command: "sleep 200 && echo '$(${env.arg1])' && sleep 100 ",
        autoStart: true
    }
}