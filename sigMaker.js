var isInViewport = function (elm) {
	var distance = elm.getBoundingClientRect()
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	)
}

var hasShaken = false

function showSteps() {
    //Unfocus text boxes to allow window to scroll
    var elm = document.querySelector( ':focus' )
    if( elm ) elm.blur()

    //Show the next two steps
    var step2 = document.getElementById("step2")
    var step3 = document.getElementById("step3")
    var endtext = document.getElementById("endtext")
    step2.style.display = "block"
    step3.style.display = "block"
    endtext.style.display = "block"

    var belowpic = document.getElementById('shaketext')
    var body = document.getElementsByTagName('body')[0]
    document.addEventListener("scroll", function() {
        if (isInViewport(belowpic) && hasShaken == false) {
            setTimeout(function() {
                var pic = document.getElementById('shakepic').classList.add('shakein')
            }, 500)
            hasShaken = true
        }
    });
  } 

function copyClipboard() {
    var elm = document.getElementById("finishedsig")
  
    if(document.body.createTextRange) {
      var range = document.body.createTextRange()
      range.moveToElementText(elm)
      range.select();
      document.execCommand("Copy")
    }
    else if(window.getSelection) {
  
      var selection = window.getSelection()
      var range = document.createRange()
      range.selectNodeContents(elm)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand("Copy")
    }

    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty()
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges()
        }
      } else if (document.selection) {  // IE?
        document.selection.empty()
    }

    document.getElementById("step2").scrollIntoView({behavior: "smooth"}
    
    );
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

function genSignature() {

    JsLoadingOverlay.show({
        'overlayBackgroundColor': '#FFF',
        'overlayOpacity': 0.6,
        'spinnerIcon': 'square-spin',
        'spinnerColor': '#253d51',
        'spinnerSize': '2x',
        'overlayIDName': 'overlay',
        'spinnerIDName': 'spinner',
      });

    try {
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
            showSteps()
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
            var email = details.email.replace(/\s+/g, '')
            emailout.setAttribute("href", "mailto:" + email)

            var img = document.getElementById('footerimg')

            if (img.complete) {
                copyClipboard()
                JsLoadingOverlay.hide();
            } else {
                img.addEventListener('load', function() {
                    copyClipboard()
                    JsLoadingOverlay.hide();
                })
                img.addEventListener('error', function() {
                    JsLoadingOverlay.hide();
                    alert('An error occured. Please try reloading the page.')
                })
            }
        }
    } catch(e) {
        alert("An error has occured, try reloading the page.")
        console.log(e)
    }
}