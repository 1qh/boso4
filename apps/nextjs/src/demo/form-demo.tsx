'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { Calendar } from '@a/ui/calendar'
import { Checkbox } from '@a/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@a/ui/form'
import { Input } from '@a/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@a/ui/popover'
import { RadioGroup, RadioGroupItem } from '@a/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@a/ui/select'
import { Switch } from '@a/ui/switch'
import { Textarea } from '@a/ui/textarea'

const items = [
    {
      id: 'recents',
      label: 'Recents'
    },
    {
      id: 'home',
      label: 'Home'
    },
    {
      id: 'applications',
      label: 'Applications'
    },
    {
      id: 'desktop',
      label: 'Desktop'
    },
    {
      id: 'downloads',
      label: 'Downloads'
    },
    {
      id: 'documents',
      label: 'Documents'
    }
  ] as const,
  FormSchema = z.object({
    bio: z
      .string()
      .min(10, {
        message: 'Bio must be at least 10 characters.'
      })
      .max(160, {
        message: 'Bio must not be longer than 30 characters.'
      }),
    dob: z.date({
      required_error: 'A date of birth is required.'
    }),
    email: z
      .string({
        required_error: 'Please select an email to display.'
      })
      .email(),
    items: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'You have to select at least one item.'
    }),
    marketing_emails: z.boolean().default(false).optional(),
    mobile: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
    type: z.enum(['all', 'mentions', 'none'], {
      required_error: 'You need to select a notification type.'
    }),
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    })
  })

export const FormDemo = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
      defaultValues: {
        items: ['recents', 'home'],
        username: ''
      },
      resolver: zodResolver(FormSchema)
    }),
    onSubmit = (data: z.infer<typeof FormSchema>) => {
      toast('You submitted the following values:', {
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    }

  return (
    <Form {...form}>
      <form className='grid w-full max-w-sm gap-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a verified email to display' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none'
                  placeholder='Tell us a little bit about yourself'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-3'>
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  className='flex flex-col gap-3'
                  defaultValue={field.value}
                  onValueChange={field.onChange}>
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <RadioGroupItem value='all' />
                    </FormControl>
                    <FormLabel className='font-normal'>All new messages</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <RadioGroupItem value='mentions' />
                    </FormControl>
                    <FormLabel className='font-normal'>Direct messages and mentions</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center gap-2'>
                    <FormControl>
                      <RadioGroupItem value='none' />
                    </FormControl>
                    <FormLabel className='font-normal'>Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='mobile'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start gap-3 rounded-md border p-4 shadow-xs'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className='flex flex-col gap-1'>
                <FormLabel className='leading-snug'>
                  Use different settings for my mobile devices
                </FormLabel>
                <FormDescription className='leading-snug'>
                  You can manage your mobile notifications in the mobile settings page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem className='flex flex-col gap-4'>
              <div>
                <FormLabel className='text-base'>Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>
              <div className='flex flex-col gap-2'>
                {items.map(item => (
                  <FormField
                    control={form.control}
                    key={item.id}
                    name='items'
                    render={({ field }) => (
                      <FormItem className='flex items-start gap-3' key={item.id}>
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={checked =>
                              checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value.filter(value => value !== item.id))
                            }
                          />
                        </FormControl>
                        <FormLabel className='text-sm leading-tight font-normal'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dob'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      variant='outline'>
                      {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent align='start' className='w-auto p-0'>
                  <Calendar
                    disabled={date => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                    mode='single'
                    onSelect={field.onChange}
                    selected={field.value}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='marketing_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs'>
                  <div className='flex flex-col gap-0.5'>
                    <FormLabel className='leading-normal'>Marketing emails</FormLabel>
                    <FormDescription className='leading-snug'>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='security_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs'>
                  <div className='flex flex-col gap-0.5 opacity-60'>
                    <FormLabel className='leading-normal'>Security emails</FormLabel>
                    <FormDescription className='leading-snug'>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      aria-readonly
                      checked={field.value}
                      disabled
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
