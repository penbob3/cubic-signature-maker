function showSteps() {
    //Unfocus text boxes to allow window to scroll
    var elm = document.querySelector( ':focus' );
    if( elm ) elm.blur();

    //Show the next two steps
    var step2 = document.getElementById("step2")
    var step3 = document.getElementById("step3")
    step2.style.display = "block"
    step3.style.display = "block"
  } 

function copyClipboard() {
    var elm = document.getElementById("finishedsig");
  
    if(document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(elm);
      range.select();
      document.execCommand("Copy");
    }
    else if(window.getSelection) {
  
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(elm);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    }

    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
    }

    document.getElementById("step2").scrollIntoView({behavior: "smooth"}
    
    );
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

function genSignature() {

    try {
        showSteps()

        var details = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            title: document.getElementById("jobtitle").value,
            msg: document.getElementById("endmsg").value
        }

        if (isEmpty(details.name)) {
            alert("Name is required!")
        } else if (isEmpty(details.email)) {
            alert("Email address is required!")
        } else if (isEmpty(details.phone)) {
            alert("Phone number is required!")
        } else {
            if (isEmpty(details.title) != true) {
                document.getElementById("titleout").innerHTML = details.title + "<br>"
            } else {
                document.getElementById("titleout").innerHTML = ""
            }
            if (isEmpty(details.msg) != true) {
                var msg = details.msg.replace(/(?:\r\n|\r|\n)/g, '<br>')
                document.getElementById("msgout").innerHTML = msg + "<br><br>"
            } else {
                document.getElementById("msgout").innerHTML = ""
            }

            document.getElementById("nameout").textContent = details.name
            document.getElementById("phoneout").textContent = details.phone
            var emailout = document.getElementById("emailout")
            emailout.textContent = details.email
            var email = details.email.replace(/\s+/g, '');
            emailout.setAttribute("href", "mailto:" + email)

            copyClipboard()
        }
    } catch(e) {
        alert("An error has occured, try reloading the page.")
        console.log(e)
    }
}