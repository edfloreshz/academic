cd ..
cd AcademicAPI || exit
build=dotnet build
if [ "$build" -eq 0 ]; then
    echo "API build successful"
    echo "Deploying API"
    publish=dotnet publish -c Release
    if [ "$publish" -eq 0 ]; then
        cd bin/Release/net6.0/publish || exit
        scm -r . gely@45.79.81.186:/var/www/html/AcademicAPI
        echo "API deployed successfully"
    else
        echo "API deployment failed"
    fi
else
    echo "API build failed"
    exit 1
fi
cd ../React.UI/ClientApp || exit
if [ -d "./node_modules" ]; then
  echo "node_modules already exists"
else
  echo "Installing node_modules"
  npm install
  npm run build
fi