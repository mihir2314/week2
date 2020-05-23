require('./log');
function check_num(ans) {
    try {
        if (isNaN(ans)) {
            throw "its not a number";

        } else {

            logger.info({ message: "its a number" })

            return ans;
        }
    }
    catch (err) {
        logger.error({ message: err, level: "error" });
    }
}
console.log(check_num("abcd"));
console.log(check_num("1234"));
console.log(check_num("@#$%^"));
