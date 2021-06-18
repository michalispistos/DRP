import React from 'react';
import ProfileForm from './profileForm';
import './editProfilePopup.css'

class EditProfilePopup extends React.Component {

    pressClose = () =>{

        this.props.setTrigger();
        this.props.updateProfile();
    }
    render() {
        return (this.props.trigger) ? (
            <div data-testid='popup' className="edit-profile-popup">
                <div className="edit-profile-popup-inner">
                     <ProfileForm pressClose={this.pressClose} profile={this.props.profile}/> 
                </div> 
       </div>) : "";
    }
}

export default EditProfilePopup;
