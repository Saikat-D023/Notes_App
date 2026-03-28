"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { createNote } from "../app/action"
import { useRouter } from "next/navigation";

  const noteSchema = z.object({
    title: z.string()
    .min(3, "title should be min 3 characters")
    .max(30, "title should be at max 30 characters"),
    content: z.string()
    .min(5, "content should be at min 5 characters")
    .max(500, "content should be max 500 characters")
  }) 

  const AddNotes = () => {
    const router = useRouter();
    const {
      register,
      handleSubmit,
      reset,
      formState: {errors, isSubmitting}
    } = useForm<z.infer<typeof noteSchema>>({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: "",
            content: "",
    },
    })

    async function onSubmit(data: z.infer<typeof noteSchema>){
        try {
          await createNote(data);
          reset();
          router.refresh();
        } catch (error) {
          console.log("Failed to add note:", error)
        }
    }

    return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col m-5 p-5 text-2xl border-2 border-neutral-900'>
            <input {...register("title")} type="text" placeholder='Title' />
            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>
        
        <div className='flex flex-col m-5 p-5 text-2xl border-2 border-neutral-900'>
            <textarea {...register("content")} placeholder='Content' />
            {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        </div>
        
        <button type="submit" disabled={isSubmitting} className='m-5 p-5 text-2xl border-2 border-neutral-900'>
          {isSubmitting ? "SAving..." : "Add Note"}</button>
      </form>
    </>
  )
}

export default AddNotes


