# Please make sure this file is marked as executable before you try to run it
# getting the actual package name this script is run on
package_name=$1
package_name=${package_name##*/}

echo Testing single module: $package_name
cd ../../
npm run test --projects packages/$package_name
