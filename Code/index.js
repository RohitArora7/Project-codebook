const ipc = require("electron").ipcRenderer;
const k8s = require('@kubernetes/client-node');
var Terminal = require('xterm').Terminal;
var FitAddon = require('xterm-addon-fit').FitAddon;
var fitAddon = new FitAddon();
var sendselectedTextc, a, b, temp_a, podc, pp, sendselectedTextc2, sstore, temp_k;
var term = new Terminal({
    // convertEol: true,
    fontFamily: 'Fira Code, Iosevka, monospace',
    fontSize: 16,
    experimentalCharAtlas: 'dynamic'
});
term.loadAddon(fitAddon);
term.open(document.getElementById('terminal'));
fitAddon.fit();


ipc.on("terminal.incomingData", (event, data) => {                  //display ls result in terminal 
    term.write(data);
    if (data.includes("ECode : 0") && temp_k === 'k8sps') {
        temp_k = ''
        a = temp_a + 8
        b = sendselectedTextc.indexOf("<check>", a)
        temp_a = b
        setTimeout(function () { sendcheckdata() }, 1100);
    } else if (data.includes("check + 127") && temp_k === 'k8sps') {
        temp_k = ''
        alert("ERROR Code :127 ");
    }
    else if (data.includes("logout") && temp_k === 'k8sps') {
        temp_k = ''
        a = temp_a + 8
        b = sendselectedTextc.indexOf("<check>", a)
        temp_a = b
        setTimeout(function () { sendcheckdata() }, 1100);
    }
    else {
    }
});
term.onData(e => {
    ipc.send("terminal.keystroke", e);                            //send ls command to terminal
});
i = 0;
var isCtrl = false;
$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 76 && isCtrl == true) {
        $("span").text(i += 1);
        selectTextareaLine(tarea, sel);           //select the line
        sendcommad();                            //send select data to terminal 
        return false;
    }
});
$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 75 && isCtrl == true) {
        $("span").text(i += 1);
        var textComponent = document.getElementById('myTextarea');
        var selectedText;
        if (textComponent.selectionStart !== undefined) {// Standards Compliant Version
            var startPos = textComponent.selectionStart;
            var endPos = textComponent.selectionEnd;
            selectedText = textComponent.value.substring(startPos, endPos);
        }
        else if (document.selection !== undefined) {// IE Version
            textComponent.focus();
            var sel = document.selection.createRange();
            selectedText = sel.text;
        }
        ipc.send('channel1', selectedText)
        return false;
    }
});
$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 73 && isCtrl == true) {
        $(".shift_td").css({ 'width': '20%' });
        $(".shift_tr").css({ 'width': '80%' });
    }
});
$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 79 && isCtrl == true) {
        $(".shift_td").css({ 'width': '50%' });
        $(".shift_tr").css({ 'width': '50%' });
    }
});
$(document).keyup(function (e) {
    if (e.which == 17) isCtrl = false;
}).keydown(function (e) {
    if (e.which == 17) isCtrl = true;
    if (e.which == 80 && isCtrl == true) {
        $(".shift_td").css({ 'width': '80%' });
        $(".shift_tr").css({ 'width': '20%' });
    }
});
function sendcommad() {
    var textComponent = document.getElementById('myTextarea');
    var selectedText;
    if (textComponent.selectionStart !== undefined) {// Standards Compliant Version
        var startPos = textComponent.selectionStart;
        var endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos);
    }
    else if (document.selection !== undefined) {// IE Version
        textComponent.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
    }
    ipc.send('channel1', selectedText + '\n')
}
document.getElementById('stop_script').addEventListener('click', e => {
    sendselectedTextc = '';
    a = '';
    b = '';
    temp_a = '';
    podc = '';
    pp = '';
    sendselectedTextc2 = '';
    sstore = '';
    temp_k = '';
});
document.getElementById('start_script').addEventListener('click', e => {
    var textComponent = document.getElementById('myTextarea');
    var selectedText;
    if (textComponent.selectionStart !== undefined) {// Standards Compliant Version
        var startPos = textComponent.selectionStart;
        var endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos);
    }
    else if (document.selection !== undefined) {// IE Version
        textComponent.focus();
        var sel = document.selection.createRange();
        selectedText = sel.text;
    }
    selectedText = selectedText.replace(/<c>/g, "echo ECode : $?<check>");
    a = 0
    b = selectedText.indexOf("<check>", a)
    temp_a = b
    sendselectedTextc = selectedText
    sendcheckdata();
})
function sendcheckdata() {
    sstore = ''
    temp_k = 'k8sps'
    podc = '';
    pp = '';
    sendselectedTextc2 = '';
    sendselectedTextc2 = sendselectedTextc.slice(a, b)
    if (sendselectedTextc2.includes("<k:all")) {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
        k8sApi.listPodForAllNamespaces().then((res) => {
            for (const i in res.body.items) {
                console.log(res.body.items[i].metadata.name)
                if (res.body.items[i].status.phase === 'Pending') {
                    sstore += ' true '
                } else {
                    sstore += ' false '
                }
            }
            if (sstore.includes('true')) {
                sendselectedTextc2 = 'kubectl get pod -A'
                sendselectedTextc2 += '\n'
                ipc.send('channel1', sendselectedTextc2)
                setTimeout(function () { sendcheckdata() }, 4500);
            } else {
                sendselectedTextc2 = 'kubectl get pod -A'
                sendselectedTextc2 += '\n'
                ipc.send('channel1', sendselectedTextc2)
                a = temp_a + 8
                b = sendselectedTextc.indexOf("<check>", a)
                temp_a = b
                setTimeout(function () { sendcheckdata() }, 1100);
            }
        });
    } else if (sendselectedTextc2.includes("<k:p:")) {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
        k8sApi.listPodForAllNamespaces().then((res) => {
            for (const i in res.body.items) {
                sstore += ' ' + res.body.items[i].metadata.name
            }
            podc = sendselectedTextc2.slice(5, sendselectedTextc2.indexOf("echo", 0) - 1)
            if (sstore.includes(podc)) {
                for (const i in res.body.items) {
                    if (res.body.items[i].metadata.name === podc) {
                        pp = podc
                    }
                }
                if (pp) {
                }
                else {
                    let regex = "/<rohit>\\S+/";
                    let regex2 = regex.replace("<rohit>", podc)
                    pp = sstore.match(eval(regex2))[0]
                }
                k8sApi.listPodForAllNamespaces().then((res) => {
                    for (const i in res.body.items) {
                        console.log(res.body.items[i].metadata.name)
                        if (res.body.items[i].metadata.name === pp) {
                            if (res.body.items[i].status.phase === 'Pending') {//alert('running')
                                sendselectedTextc2 = 'kubectl get pod -A'
                                sendselectedTextc2 += '\n'
                                ipc.send('channel1', sendselectedTextc2)
                                setTimeout(function () { sendcheckdata() }, 4500);
                            }
                            else {
                                sendselectedTextc2 = 'kubectl get pod -A';
                                sendselectedTextc2 += '\n';
                                ipc.send('channel1', sendselectedTextc2);
                                a = temp_a + 8;
                                b = sendselectedTextc.indexOf("<check>", a);
                                temp_a = b;
                                setTimeout(function () { sendcheckdata() }, 1100);
                            }
                        }
                    }
                });
            } else {
                sendselectedTextc2 = 'kubectl get pod -A'
                sendselectedTextc2 += '\n'
                ipc.send('channel1', sendselectedTextc2)
                setTimeout(function () { sendcheckdata() }, 4500);
            }
        });
    }
    else {
        if (sendselectedTextc2 === '') {
            temp_k = ''
        }
        else {
            sendselectedTextc2 += '\n'
            ipc.send('channel1', sendselectedTextc2)
        }
    }
}
var sel;
function getLineNumber(textarea, indicator) {
    indicator.innerHTML = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
    //set value of number of line
    sel = textarea.value.substr(0, textarea.selectionStart).split("\n").length;
}
var tarea = document.getElementById('myTextarea');
function selectTextareaLine(tarea, lineNum) {
    lineNum--; // array starts at 0
    var lines = tarea.value.split("\n");
    // calculate start/end
    var startPos = 0, endPos = tarea.value.length;
    for (var x = 0; x < lines.length; x++) {
        if (x == lineNum) {
            break;
        }
        startPos += (lines[x].length + 1);
    }
    var endPos = lines[lineNum].length + startPos;
    // do selection
    // Chrome / Firefox
    if (typeof (tarea.selectionStart) != "undefined") {
        tarea.focus();
        tarea.selectionStart = startPos;
        tarea.selectionEnd = endPos;
        return true;
    }
    // IE
    if (document.selection && document.selection.createRange) {
        tarea.focus();
        tarea.select();
        var range = document.selection.createRange();
        range.collapse(true);
        range.moveEnd("character", endPos);
        range.moveStart("character", startPos);
        range.select();
        return true;
    }
    return false;
}
$(function () {
    $("#div1").resizable();
    $('#div1').resize(function () {
        //   fitAddon.fit();
        $('#div2').width($("#parent").width() - $("#div1").width());
    });
    $(window).resize(function () {
        $('#div2').width($("#parent").width() - $("#div1").width());
        $('#div1').height($("#parent").height());
    });
    ipc.send('set_var', '/tmp/temp.txt')  // set the variable in case of refresh
    ipc.send('load_temp', '/tmp/temp.txt')    //load temp
});
ipc.on('load_temp_data', (e, args) => {
    //console.log(args) 
    //console.log(args)
    var s = document.getElementById('myTextarea2');
    s.value = args;
})
document.getElementById('openf').addEventListener('click', e => {
    // ipcRenderer.send( 'channel1', 'cat /etc/hosts') 
    ipc.send('openf_channel', 'ls')
})
ipc.on('selected-file', (e, args) => {
    var s = document.getElementById('path');
    s.value = args;
})
ipc.on('openf_channel2', (e, args) => {
    var s = document.getElementById('myTextarea');
    s.value = args;
})
document.getElementById('savef').addEventListener('click', e => {
    var sendv = document.getElementById('myTextarea').value;
    ipc.send('savef_channel', sendv)
})
document.getElementById('myTextarea2').addEventListener('focusout', e => {
    var sendv = document.getElementById('myTextarea2').value;
    ipc.send('save_temp_data', sendv)
})
