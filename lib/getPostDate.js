export function getPostDate (date) {
    //console.log(date)
    let today = new Date();
    let created = new Date(date);

    let offset = today.getTimezoneOffset();
    today = new Date(today.getTime() + offset * 60000);

    let diffMs = (today - created); // milliseconds between now & then
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor(diffMs / 3600000); // hours
    let diffMins = Math.round(diffMs / 60000); // minutes

    let postCreated = "";

    if (diffMins < 60) {
        postCreated = ("Há " + diffMins + " minutos");
    } else if (diffHrs < 24) {
        postCreated = ("Há " + diffHrs + " hora");
        if (diffHrs > 1) postCreated = postCreated + "s";
    } else if (diffDays < 31) {
        postCreated = ("Há " + diffDays + " dia");
        if (diffDays > 1) postCreated = postCreated + "s";
    } else {
        postCreated = (created.getDate() + "/" + (created.getMonth() + 1) + "/" + created.getFullYear());
    }
    return postCreated;
}