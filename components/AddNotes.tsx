"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

  const noteSchema = z.object({
    title: z.string()
    .min(5, "title should be minimum 5 characters")
    .max(30, "title should be at max 30 characters"),
    content: z.string()
    .min(100, "content should be minimum 100 characters")
    .max(500, "content should be minimum 100 characters")
  }) 

  const AddNotes = () => {
    const form = useForm<z.infer<typeof noteSchema>>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: "",
            content: "",
    },
    })

    function onSubmit(data: z.infer<typeof noteSchema>){
        console.log(data);
    }

    return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" placeholder='Title' />
        <input type='text' placeholder='Content' />
        <button type="submit" onClick={onSubmit}>Add Note</button>
      </form>
    </>
  )
}

export default AddNotes


