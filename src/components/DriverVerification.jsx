import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCar, FaPalette, FaFileUpload, FaHashtag, FaCamera } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { driverLogout } from "../Features/Slice";
import { useDispatch } from "react-redux";
import { Context } from "./Context";

// Generate dynamic years for car model dropdown
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(30), (val, index) => currentYear - index);

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  padding: 30px;
  background: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #FE7C04;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: black;
  margin-bottom: 20px;
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  position: relative;
`;

const Icon = styled.div`
  color: #FE7C04;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
`;

const Select = styled.select`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const Button = styled.button`
  background: #FE7C04;
  color: white;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: gray;
  }
`;

const ProfilePicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfilePicPreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
`;

const DriverVerification = ({driver_id}) => {
    const {fetchDriverById,setVerificationStatus}=useContext(Context)
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    driver_id,
    carName: "",
    carModel: currentYear,
    carColor: "",
    carPlate: "",
    document: null,
    profilePhoto: null,
  });

  console.log(formData)

  const [errors, setErrors] = useState({});
  const [profilePreview, setProfilePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (name === "profilePhoto" && file) {
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validImageTypes.includes(file.type)) {
          setErrors({ ...errors, profilePhoto: "Invalid file type. Upload a JPG, JPEG, or PNG." });
          return;
        }
        setProfilePreview(URL.createObjectURL(file));
      }

      if (name === "document" && file) {
        if (file.type !== "application/pdf") {
          setErrors({ ...errors, document: "Only PDF files are allowed." });
          return;
        }
      }

      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let newErrors = {};

//     if (!formData.carName.trim()) newErrors.carName = "Car name is required";
//     if (!formData.carColor.trim()) newErrors.carColor = "Car color is required";
//     if (!formData.carPlate.trim()) newErrors.carPlate = "Car plate number is required";
//     if (!formData.document) newErrors.document = "Please upload a document (PDF only)";
//     if (!formData.profilePhoto) newErrors.profilePhoto = "Profile photo is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       Swal.fire({
//         title: "Submitting...",
//         text: "Please wait while we verify your details.",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       const formDataToSend = new FormData();
//       for (const key in formData) {
//         formDataToSend.append(key, formData[key]);
//       }

//       const response = await axios.post("https://www.leosdrive.com/api/driver_verification.php", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         Swal.fire({ icon: "success", title: "Success!", text: response.data.message,confirmButtonText:"Logout", allowOutsideClick:false }).then((result)=>{
//             if(result.isConfirmed){
//                 dispatchEvent(driverLogout());
//             }
//         })
        
//       } else {
//         Swal.fire({ text: response.data.error });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Verification Failed",
//         text: error.response?.data?.error || "Something went wrong.",
//       });
//     }
//   };



const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.carName.trim()) newErrors.carName = "Car name is required";
    if (!formData.carColor.trim()) newErrors.carColor = "Car color is required";
    if (!formData.carPlate.trim()) newErrors.carPlate = "Car plate number is required";
    if (!formData.document) newErrors.document = "Please upload a document (PDF only)";
    if (!formData.profilePhoto) newErrors.profilePhoto = "Profile photo is required";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    try {
        const formDataToSend = new FormData();
        formDataToSend.append("driver_id", driver_id);
        formDataToSend.append("carName", formData.carName);
        formDataToSend.append("carModel", formData.carModel);
        formDataToSend.append("carColor", formData.carColor);
        formDataToSend.append("carPlate", formData.carPlate);
        formDataToSend.append("profilePhoto", formData.profilePhoto);
        formDataToSend.append("document", formData.document);

        const response = await axios.post(
            "https://www.leosdrive.com/api/driver_verification.php",
            formDataToSend,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        if (response.data.success) {
            fetchDriverById(driver_id)
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: response.data.message,
                confirmButtonText: "Logout",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    handleLogout()
                }
            });
        } else {
            Swal.fire({ text: response.data.error });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: error.response?.data?.error || "Something went wrong.",
        });
    }
};





 const handleLogout = () => {
    Swal.fire({
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(driverLogout());
     setVerificationStatus('')
        Swal.fire('Logged Out!', 'You have been logged out.', 'success');
        navigate('/');
      }
    });
  };




  return (
    <Container>
      <Title>Driver Verification</Title>
      <Subtitle>Welcome, driver! Please provide the following details for verification. Once approved, you will be granted access to your dashboard.</Subtitle>
      
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          {/* Profile Photo */}
          <ProfilePicWrapper>
            <label>Upload Profile Photo:</label>
            <InputWrapper>
              <Icon><FaCamera /></Icon>
              <Input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} />
            </InputWrapper>
            {profilePreview && <ProfilePicPreview src={profilePreview} alt="Profile Preview" />}
          </ProfilePicWrapper>
          <ErrorText show={errors.profilePhoto}>{errors.profilePhoto}</ErrorText>

          {/* Car Name */}
          <InputWrapper>
            <Icon><FaCar /></Icon>
            <Input type="text" name="carName" placeholder="Car Name" value={formData.carName} onChange={handleChange} />
          </InputWrapper>
          <ErrorText show={errors.carName}>{errors.carName}</ErrorText>

          {/* Car Model */}
          <InputWrapper>
            <Icon><FaCar /></Icon>
            <Select name="carModel" value={formData.carModel} onChange={handleChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </InputWrapper>

          {/* Car Color */}
          <InputWrapper>
            <Icon><FaPalette /></Icon>
            <Input type="text" name="carColor" placeholder="Car Color" value={formData.carColor} onChange={handleChange} />
          </InputWrapper>

          {/* Car Plate Number */}
          <InputWrapper>
            <Icon><FaHashtag /></Icon>
            <Input type="text" name="carPlate" placeholder="Car Plate Number" value={formData.carPlate} onChange={handleChange} />
          </InputWrapper>

          {/* Document Upload */}
          <InputWrapper>
            <Icon><FaFileUpload /></Icon>
            <Input type="file" name="document" accept="application/pdf" onChange={handleChange} />
          </InputWrapper>

          <Button type="submit">Submit for Verification</Button>
        </form>
        <Button style={{background:"gray"}} onClick={handleLogout}>Logout</Button>
      </FormWrapper>
    </Container>
  );
};

export default DriverVerification;
