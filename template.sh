read -e -p "Component name: " name
read -e -p "Path: " path

format=""
for WORD in $name 
do ## FOR START

    format+="$(tr '[:lower:]' '[:upper:]' <<< ${WORD:0:1})${WORD:1}"

done ## FOR END

cd $path

if [ ! -d "$(pwd)/$format" ]; 
then ## IF START

mkdir $format

cd "$(pwd)/$format"

touch "style.scss"

cat <<EOT >>script.js
export default {}
EOT

cat <<EOT >> index.vue
<template>
  <div />
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss" scoped />
EOT

echo
echo "Folder ${format} as been created in $(pwd)"
echo

else ## IF ELSE

echo
echo "This component already exist !"
echo

fi ## IF END