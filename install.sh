if [ ! -f `which npm` ]; then
    echo "Cannot find npm!"
    exit 1
fi

COMMAND="npm install -g nativescript"

eval ${COMMAND}

if [ ! -f `which tns` ]; then
    echo "Path to 'tns' not found. Did it fail?"
fi
