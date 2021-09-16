import axios from "axios";

const Auth = {
    login: (userData) => {
        let info = {
            firstName: "jitu",
            lastName: "jahagirdar",
            email: "jitu@gmail.com",
            mobileNumber: "9800000000",
            address: "Street 9, 4Th avenue, San Fransisco, USA",
            img: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
            role: "super",
            token: "12345"
        };
        localStorage.setItem('auth', JSON.stringify(info));

    },
    logout : (user) => {
        // let getauth = localStorage.getItem('testObject');
        // console.log('retrieved Object: ', JSON.parse(getauth));
        localStorage.removeItem("auth")
    }
}





export default Auth 