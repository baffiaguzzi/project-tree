# Struttura progetto: C:\Users\gabri\OneDrive\Desktop\server-api_bot

├── LICENSE
├── README.md
├── cli
│   ├── __init__.py
│   ├── api_check.py
│   └── server_check.py
├── configs
│   ├── __init__.py
│   ├── config_apis.json
│   └── config_servers.json
├── logs
├── requirements.txt
├── start_bot.bat
└── telegram_bot
    ├── __init__.py
    ├── callbacks
    │   ├── api_env.py
    │   ├── api_flow.py
    │   ├── body.py
    │   ├── router.py
    │   └── server.py
    ├── commands
    │   ├── __init__.py
    │   ├── api.py
    │   ├── export.py
    │   ├── history.py
    │   ├── logout.py
    │   ├── server.py
    │   └── start.py
    ├── config.py
    ├── services
    │   ├── api_service.py
    │   ├── auth_service.py
    │   └── server_service.py
    ├── telegram_bot.py
    └── utils
        ├── formatting.py
        ├── log_reader.py
        └── request_logger.py
