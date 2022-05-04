# codebook



Start Script 

**Shortcut :**

EDITOR SHORTCUT
Ctrl + i : Resize Editor to 20 %
Ctrl + o : Resize Editor to 50 %
Ctrl + p : Resize Editor to 70 % 
Ctrl + l : Auto select the single command and send it to terminal
Ctrl + k : Send selected command to terminal

TERMINAL SHORTCUT

Ctrl + l : Clear the terminal
Ctrl + Insert : copy from terminal
Shift + Terminal : paste into terminal

APPLICATION SHORTCUT

Ctrl + w : Exit application
Ctrl + m : Minimize application
Ctrl + Shift + r : Restart application



**Tags :**

```<c>``` : Check prev command is successfully run or not . 

```<k:all``` : Check all pods are running or not  

```<k:p:pod_name``` : Check a particular is created and is in running phase 


**Note :**

1. Before using **<k:all , <k:p:pod_name** kube-config file must be present in local system .kube directory i.e. 
  
Always cp config file from remote to local 
  
Example
```bash
scp ubuntu@192.168.122.3:~/.kube/config ~/.kube/config

scp ~/.kube/config rohit@192.168.0.110:~/.kube/config
```

2. ```<c>``` check tag must be use on the next line of the command.

Example

```
ls
<c>
mkdir test
<c>
```

3. Kubectl must be installed in remote machine so that it can give update when pods not ready 


4. A temp.txt file is created at location /tmp for lower text editor and text inside lower text editor is automatically saved when deselected.
   Also, temp.txt is temporary and will delete automatically when OS restart 

