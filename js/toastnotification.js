function sendToast(header, message, imageUri, imageAlt, audio) {
    var notifications = Windows.UI.Notifications;

    var template = notifications.ToastTemplateType.toastImageAndText02;
    var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);

    var toastTextElements = toastXml.getElementsByTagName("text");
    toastTextElements[0].innerText = header;
    toastTextElements[1].innerText = message;

    var toastImageElements = toastXml.getElementsByTagName("image");
    toastImageElements[0].setAttribute("src", imageUri);
    toastImageElements[0].setAttribute("alt", imageAlt);


    var audio = toastXml.createElement("audio");
    var toastNode = toastXml.selectSingleNode("/toast");
    if (audio) {
        audio.setAttribute("src", audio);
    } else {
        audio.setAttribute("silent", "true");
    }
    toastNode.setAttribute("duration", "short");
    toastNode.appendChild(audio);

    var toast = new notifications.ToastNotification(toastXml);
    var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
    toastNotifier.show(toast);
}
