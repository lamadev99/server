import React from "react";
import { Button, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ProfileForm = ({ setProfileFormOpen }) => {
  return (
    <section className="bg-[#111111ae] fixed top-0 left-0 w-full h-full itemCenter">
      <div className="bg-white mt-6 px-4 md:px-8 py-4 w-full md:w-1/2 h-auto overflow-scroll rounded-2xl relative">
        <h1 className="text-2xl text-gray-600">Add/Update Profile</h1>
        <HighlightOffIcon
          onClick={() => setProfileFormOpen(false)}
          className="absolute right-3 top-4 cursor-pointer text-gray-500"
        />
        <form action="" className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2">
            <TextField
              type="text"
              variant="outlined"
              label="First Name"
              fullWidth
              required
            />
            <TextField
              type="text"
              variant="outlined"
              label="Last Name"
              fullWidth
              required
            />

          </div>
          <TextField
            type="text"
            multiline
            rows={5}
            variant="outlined"
            label="Your Bio"
            required
            fullWidth
          />
          <div className="flex items-center gap-2">
            <TextField
              type="text"
              variant="outlined"
              label="Facebook"
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              label="Instagram"
              fullWidth
            />
          </div>
          <div className="flex items-center gap-2">
          <TextField
            type="text"
            variant="outlined"
            label="Twitter"
            fullWidth
          />
          <TextField
            type="file"
            variant="outlined"
            required
            fullWidth
          />
          </div>
          <div>
            <Button variant="contained">Submit</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileForm;
