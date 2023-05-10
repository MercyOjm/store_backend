/* ---------------------- Email verification ---------------------- */
//template
export function verify_message(userid, username, token) {
    return `
              <h3>Dear ${username}, <h3>
  
              <p>Thank you for registering on our website! <br>
              In order to complete your registration, verify your email address.<br> 
              please click the button below:</p>
  
              <a href=http://localhost:5000/users/verify_email/${userid}/${token} style="padding: 1rem 3rem;background-color:skyblue;color:white;font-size:1.3rem;text-decoration:none;margin:3rem auto;text-align:center;border-radius: 5px; border:2px solid orangered;box-shadow:2px 2px 5px #999;display:box;">Verify Email</a>
  
              <p>Thank you for joining our community!</p>
  
              <p>Best regards,<br>
              Onlineshop!</p>
          `;
  }
  
  //create token document
  export async function genVerifyToken(user) {
    //generate the new token (random string)
    const newToken = crypto.randomBytes(16).toString("hex");
    console.log("newToken", newToken);
  
    //store a document for newtoken in DB
    const verification_token = await Token.create({
      token: newToken,
      userid: user._id,
    });
  
    return verification_token;
  }