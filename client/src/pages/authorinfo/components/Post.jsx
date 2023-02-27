import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import JoditEditor from 'jodit-react';

const Post = ({setOpen}) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  return (
    <section className='bg-[#111111a8] fixed top-8 left-0 w-full h-full flex items-center justify-center'>
        <div className='w-full md:w-1/2 h-[38rem] overflow-scroll bg-white px-4 md:px-8 py-4 rounded-2xl relative'>
            <h1 className='text-2xl text-gray-600'>Add/Update Post</h1>
            <HighlightOffIcon onClick={()=>setOpen(false)} className='absolute right-3 top-3 cursor-pointer text-red-500'/>
            <form action="" className='flex flex-col gap-4 mt-4'>
                <TextField autoFocus={true} type="text" label="Title" variant='outlined' required fullWidth />
                <TextField type="text" label="Category" variant='outlined' required fullWidth/>
                <TextField type="text" label="Sub Category" variant='outlined' fullWidth/>
                <JoditEditor ref={editor} value={content} onChange={(e)=>setContent(e)} />
                <TextField type="file" label="Image" variant='outlined' required fullWidth />
                <div className='flex items-center gap-3'>
                    <Button type="submit" variant='outlined"' color='secondary' >Clear</Button>
                    <Button type="submit" variant='contained'>Post</Button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default Post