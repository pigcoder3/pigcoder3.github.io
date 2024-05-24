# Push the new files to the s3 bucket
aws s3 cp . s3://seanmjohnson/ --recursive --exclude "*" --include "*.html" --include "*.css" --include "icons/*" --include "images/*" --include "*.js" --include "resume.pdf"
# Invalidate the CloudFront caches so the website actually updates
aws cloudfront create-invalidation --distribution-id EQBUJ2IZGO6B3 --paths "/*"
