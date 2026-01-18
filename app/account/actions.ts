'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'


export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  // redirect(`/user/${formData.get('username')}`)
  redirect(`/`)
}

export async function signup(formData: FormData) {
  const supabase = await createClient()




  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  //   username: formData.get('username') as string,
  // }

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect('/error')
  }
  else if (data?.user) {
    // const user = data.user
    // await supabase.from('profiles').insert({
    //   id: user.id,
    //   username: formData.get('username') as string,
    //   email: formData.get('email') as string,
    //   bio: formData.get('bio') || "Hello World!",
    // })
    revalidatePath('/', 'layout')
    redirect('/account/signup/createProfile')

  }

  // revalidatePath('/', 'layout')
  // redirect(`/user/${formData.get('username')}`)
}

// export async function createProfile(formData: FormData) {
//   const supabase = await createClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     await supabase.from('profiles').insert({
//       id: user.id,
//       username: formData.get('username'),
//       bio: formData.get('bio') || "Hello world!"
//     });
//   }
     
//   revalidatePath('/', 'layout')
//   redirect(`/user/${formData.get('username')}`);
// }