


--------GIT 
eval "$(ssh-agent -s)"
ssh-add ./id_rsa

ssh -T git@github.com
then

check the remote url 
git config --get remote.origin.url 
 
then set new one   Fairvinay/aadharcardupladnode.git
 git remote set-url origin git@github.com:Fairvinay/aadharcardupladnode.git

in case above does not work try this 
git push -u git@github.com:Fairvinay/aadharcardupladnode.git master

URL is like this 
http://localhost:61749/readCard/

New : Caarvita@1234