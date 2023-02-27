import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';

const Create = () => {
  const editor = useRef(null)
  const [content, setContent] = useState('')

  return (
    <section className='w-full h-full'>
        <div className='w-full  h-auto  px-4 md:px-8 py-4 relative'>
            <h1 className='text-2xl text-gray-600'>Create / Update News</h1>
            <form action="" className=' bg-white grid grid-cols-3 items-center gap-4 mt-4 p-14'>
              <div className='col-span-1 flex items-center gap-4 flex-col'>
                <TextField autoFocus={true} type="text" label="Title" variant='outlined' required fullWidth />
                <TextField type="text" label="Category" variant='outlined' required fullWidth/>
                <TextField type="text" label="Sub Category" variant='outlined' fullWidth/>
                <TextField type="text" label="Keywords" variant='outlined' required fullWidth/>
                <TextField type="text" label="Metaword" variant='outlined' required fullWidth/>
              </div>
              <div className='col-span-2 flex gap-4 flex-col'>
                <JoditEditor ref={editor} value={content} onChange={(e)=>setContent(e)} />
                <TextField type="file" variant='outlined' required fullWidth />
                <div className='flex items-center gap-3'>
                    <Link to="/">
                      <Button type="submit" variant='outlined"' color='secondary'>Cancle</Button>
                    </Link>
                    <Button type="submit" variant='contained'>Post</Button>
                </div>
              </div>
            </form>
        </div>
    </section>
  )
}

export default Create