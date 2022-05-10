# codebook



**Shortcuts :**___________________________________________________________

> EDITOR SHORTCUT

Ctrl + b : Resize Editor to 20 %\
Ctrl + n : Resize Editor to 50 %\
Ctrl + m : Resize Editor to 70 %

> BUTTON SHORTCUT

Single cmd : Ctrl + j : Auto select the single command and send it to terminal.\
Multi cmd : Ctrl + k : Send selected command to terminal.\
Start Script : Ctrl + u : Start script include ```<c>, <k:all, <k:p:pod_name```.\
Stop Script : Ctrl + i : Stop the script from executing.\
Open file : Ctrl + o : open the file.\
Save file : Ctrl + s : save the file.

> TERMINAL SHORTCUT

Ctrl + L : Clear the terminal.\
Ctrl + Insert : Copy from terminal.\
Shift + Insert : Paste into terminal.


**Tags :**________________________________________________________________

```<c>``` : Check prev command is successfully run or not. 

```<k:all``` : Check all pods are running or not.

```<k:p:pod_name``` : Check a particular pod is created and is in running phase.


**Note :**________________________________________________________________

1. Before using **<k:all , <k:p:pod_name** kube-config file must be present in local system .kube directory i.e. 
  
Always cp config file from remote to local.
  
Example
```bash
scp remote@ip:~/.kube/config ~/.kube/config
```
or
```bash
scp ~/.kube/config local@ip:~/.kube/config
```

2. ```<c>``` check tag must be use on the next line of the command.

Example

```
ls
<c>
mkdir test
<c>
```

3. Kubectl must be installed in remote machine so that it can give update when pods not ready.


4. A temp.txt file is created at location /tmp for lower text editor and text inside lower text editor is automatically saved when deselected.
   Also, temp.txt is temporary and will delete automatically when OS restart.


**FAQ**___________________________________________________________________

> Codebook not starting.
* Make sure system has active internet connection.
* Curl must be installed in system.
* Remove the prev codebook - ```sudo apt remove codebook -y``` and install new.

> ```<k:all , <k:p:pd_name``` not working.
* Make sure k8s config file must be present in local system .kube directory. 
* <c> tag must also be included before ```<k:all , <k:p:pd_name```.
  
> Ctrl + b,n,m not working.
* Make sure editor part is clicked/selected before shortcut pressed , If terminal is clicked/selected than Ctrl + b,n,m will not work.
  

**Bugs**____________________________________________________________________
  
> Terminal Font spacing issue.\
> Long command has overlap view issue.
