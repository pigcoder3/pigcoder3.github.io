

#It seems that GitHub Pages does not allow underscores in file paths (ree)
#It also just so happens that sphinx-doc generates directories whose names start with underscores
#It seems I have a lot of renaming to do

#This is created specifically for pysics, so if I have other projects that use Sphinx,
#then Im gonna have to adapt this :pensive:
#Additionally, if someone else wants to do this, then they are going to have to put the correct
#path below.

doc_dir=~/Documents/programming/projects/pysics/docs/

#Clear out previous stuff (CAREFUL!)
rm -rf projects/pysics/docs/*

#Copy the documentation
#dir=$pwd
#echo $dir E
#cd $doc_dir
#make clean html
#cd $dir
#pwd
cp -r ${doc_dir}/_build/html/* projects/pysics/docs
cp -r ${doc_dir}_build/* projects/pysics/docs

ls projects/pysics/docs/html

#Rename references
sed -i '' "s/_static/static/g" projects/pysics/docs/*.html
sed -i '' "s/_images/images/g" projects/pysics/docs/*.html

#Move referenced directories to appropriate names
mv projects/pysics/docs/_static projects/pysics/docs/static
mv projects/pysics/docs/_images projects/pysics/docs/images
mv projects/pysics/docs/_sources projects/pysics/docs/sources
