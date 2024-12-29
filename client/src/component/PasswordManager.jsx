import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import './PasswordManager.css'; // Optional CSS for PasswordManager

const PasswordManager = () => {
  const [email, setEmail] = useState(""); // To store logged-in user's email
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [id, setId] = useState("");
  const passRef = useRef();
  const titleRef = useRef();

  // Fetch passwords on component mount
  useEffect(() => {
    showPasswords();
  }, []);

  // Get user info on component mount to display their email
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await Axios.get("http://localhost:3001/login");
      if (response.data.login) {
        // User is logged in, store their email in state
        setEmail(response.data.user.email); 
      }
    };
    getUserInfo();
  }, []);

  // Function to add a new password
  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", { password, title }).then(() => {
      showPasswords();
    });
    passRef.current.value = "";
    titleRef.current.value = "";
  };

  // Function to fetch and display stored passwords
  const showPasswords = () => {
    Axios.get("http://localhost:3001/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  };

  // Function to update an existing password
  const updatePassword = (id) => {
    const newPassword = prompt("Enter new password: ");
    Axios.put(`http://localhost:3001/updatepassword/${id}`, { password: newPassword })
      .then(() => {
        showPasswords();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Function to delete a password
  const deletePassword = (id) => {
    Axios.delete(`http://localhost:3001/deletepassword/${id}`).then(() => {
      setPasswordList(passwordList.filter((val) => val.id !== id));
    });
  };

  // Function to decrypt a password
  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:3001/decryptpassword", {
      password: encryption.passwords,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(
        passwordList.map((val) =>
          val.id === encryption.id
            ? { ...val, password: response.data.decryptedPassword }
            : val
        )
      );
      setIsDecrypted(true);
    });
  };

  // Function to handle showing/hiding password
  const handleBtn = (id) => {
    setId(id);
  };

  // Function to handle logout
  const handleLogout = async () => {
    const response = await Axios.post("http://localhost:3001/logout");
    if (response.data.logout) {
      // Redirect to login or home page after logout
      window.location.href = "/login"; // Change this to your desired route
    }
  };

  return (
    <div className="PasswordManager">
      <h2>Welcome, {email}</h2>  {/* Displaying logged-in user's email */}
      <button id="logout" onClick={handleLogout}>Logout</button> {/* Logout button */}
      
      {/* Password adding form */}
      <div className="AddingPassword">
        <input
          type="text"
          ref={passRef}
          placeholder="Ex. password123"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="text"
          ref={titleRef}
          placeholder="Ex. Facebook"
          onChange={(event) => setTitle(event.target.value)}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>

      {/* Password list */}
      <div className="Passwords">
        {passwordList.map((val, key) => (
          <div className="password" key={key}>
            <h3>{val.title}</h3>
            <div>
              <span>{id === val.id ? val.password : '*****'}</span> {/* Show password or mask it */}
              <button
                id="show"
                onClick={() => {
                  if (!isDecrypted) {
                    decryptPassword(val); // Decrypt the password
                  } else {
                    // Mask password when Hiding
                    setPasswordList(
                      passwordList.map((item) =>
                        item.id === val.id ? { ...item, password: '*****' } : item
                      )
                    );
                    setIsDecrypted(false); // Reset the button state
                  }
                  handleBtn(val.id); // Toggle the button for this password
                }}
              >
                {id === val.id ? (!isDecrypted ? "SHOW" : "HIDE") : "SHOW"}
              </button>
              <button id="update" onClick={() => updatePassword(val.id)}>
                UPDATE
              </button>
              <button id="delete" onClick={() => deletePassword(val.id)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordManager;
  