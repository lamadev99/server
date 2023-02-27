import React, { useState } from 'react'
import { Button, Checkbox, TextField, Typography } from '@mui/material'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CommentBox = () => {
    const [form, setForm] = useState({
        'comment': '',
        'fName': '',
        'email': '',
        'is_save': false,
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        // const resp = endPoints('comment', 'POST', data )
        console.log(form);
    }
    
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className='my-8 bg-white p-4' id="comment">
        <div>
            <h1 className='text-2xl mb-4 font-semibold'>Add Comment</h1>
            <form onSubmit={handleSubmit} className='flex gap-4 flex-col'>
                <TextField multiline rows={6} name="comment" label='Comment' onChange={handleChange} variant="outlined" required fullWidth/>
                <div className='flex items-center gap-2 w-full'>
                    <TextField name='fName' label="Full Name" type="text"  onChange={handleChange} variant="outlined" required fullWidth />
                    <TextField name='email' label="Email Address" type='email'  onChange={handleChange} required fullWidth />
                </div>
                <div className='flex items-center gap-2 w-full'>
                    <Checkbox name='is_save' {...label}  onChange={handleChange} />
                    <Typography className='text-gray-500'>Save my name, and email in this browser for the next time I comment.</Typography>
                </div>
                <div>
                    <Button type='submit' variant='contained' color='success'>Submit</Button>

                </div>
            </form>
        </div>
    </section>
  )
}

export default CommentBox