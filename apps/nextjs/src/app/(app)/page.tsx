import { AccordionDemo } from '~/demo/accordion-demo'
import { AlertDemo } from '~/demo/alert-demo'
import { AlertDialogDemo } from '~/demo/alert-dialog-demo'
import { AspectRatioDemo } from '~/demo/aspect-ratio-demo'
import { AvatarDemo } from '~/demo/avatar-demo'
import { BadgeDemo } from '~/demo/badge-demo'
import { BreadcrumbDemo } from '~/demo/breadcrumb-demo'
import { ButtonDemo } from '~/demo/button-demo'
import { CalendarDemo } from '~/demo/calendar-demo'
import { CardDemo } from '~/demo/card-demo'
import { CarouselDemo } from '~/demo/carousel-demo'
import { ChartDemo } from '~/demo/chart-demo'
import { CheckboxDemo } from '~/demo/checkbox-demo'
import { CollapsibleDemo } from '~/demo/collapsible-demo'
import { ComboboxDemo } from '~/demo/combobox-demo'
import { CommandDemo } from '~/demo/command-demo'
import { ComponentWrapper } from '~/demo/component-wrapper'
import { ContextMenuDemo } from '~/demo/context-menu-demo'
import { DatePickerDemo } from '~/demo/date-picker-demo'
import { DialogDemo } from '~/demo/dialog-demo'
import { DrawerDemo } from '~/demo/drawer-demo'
import { DropdownMenuDemo } from '~/demo/dropdown-menu-demo'
import { FormDemo } from '~/demo/form-demo'
import { HoverCardDemo } from '~/demo/hover-card-demo'
import { InputDemo } from '~/demo/input-demo'
import { InputOTPDemo } from '~/demo/input-otp-demo'
import { LabelDemo } from '~/demo/label-demo'
import { MenubarDemo } from '~/demo/menubar-demo'
import { NavigationMenuDemo } from '~/demo/navigation-menu-demo'
import { PaginationDemo } from '~/demo/pagination-demo'
import { PopoverDemo } from '~/demo/popover-demo'
import { ProgressDemo } from '~/demo/progress-demo'
import { RadioGroupDemo } from '~/demo/radio-group-demo'
import { ResizableDemo } from '~/demo/resizable-demo'
import { ScrollAreaDemo } from '~/demo/scroll-area-demo'
import { SelectDemo } from '~/demo/select-demo'
import { SeparatorDemo } from '~/demo/separator-demo'
import { SheetDemo } from '~/demo/sheet-demo'
import { SkeletonDemo } from '~/demo/skeleton-demo'
import { SliderDemo } from '~/demo/slider-demo'
import { SonnerDemo } from '~/demo/sonner-demo'
import { SwitchDemo } from '~/demo/switch-demo'
import { TableDemo } from '~/demo/table-demo'
import { TabsDemo } from '~/demo/tabs-demo'
import { TextareaDemo } from '~/demo/textarea-demo'
import { ToggleDemo } from '~/demo/toggle-demo'
import { ToggleGroupDemo } from '~/demo/toggle-group-demo'
import { TooltipDemo } from '~/demo/tooltip-demo'

export default function SinkPage() {
  return (
    <div className='grid flex-1 gap-4 p-4'>
      <ComponentWrapper className='w-full' name='chart'>
        <ChartDemo />
      </ComponentWrapper>
      <ComponentWrapper name='accordion'>
        <AccordionDemo />
      </ComponentWrapper>
      <ComponentWrapper name='alert'>
        <AlertDemo />
      </ComponentWrapper>
      <ComponentWrapper name='alert-dialog'>
        <AlertDialogDemo />
      </ComponentWrapper>
      <ComponentWrapper name='aspect-ratio'>
        <AspectRatioDemo />
      </ComponentWrapper>
      <ComponentWrapper name='avatar'>
        <AvatarDemo />
      </ComponentWrapper>
      <ComponentWrapper name='badge'>
        <BadgeDemo />
      </ComponentWrapper>
      <ComponentWrapper name='breadcrumb'>
        <BreadcrumbDemo />
      </ComponentWrapper>
      <ComponentWrapper name='button'>
        <ButtonDemo />
      </ComponentWrapper>
      <ComponentWrapper name='calendar'>
        <CalendarDemo />
      </ComponentWrapper>
      <ComponentWrapper name='card'>
        <CardDemo />
      </ComponentWrapper>
      <ComponentWrapper className='hidden md:flex' name='carousel'>
        <CarouselDemo />
      </ComponentWrapper>
      <ComponentWrapper name='checkbox'>
        <CheckboxDemo />
      </ComponentWrapper>
      <ComponentWrapper name='collapsible'>
        <CollapsibleDemo />
      </ComponentWrapper>
      <ComponentWrapper name='combobox'>
        <ComboboxDemo />
      </ComponentWrapper>
      <ComponentWrapper name='command'>
        <CommandDemo />
      </ComponentWrapper>
      <ComponentWrapper name='context-menu'>
        <ContextMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name='date-picker'>
        <DatePickerDemo />
      </ComponentWrapper>
      <ComponentWrapper name='dialog'>
        <DialogDemo />
      </ComponentWrapper>
      <ComponentWrapper name='drawer'>
        <DrawerDemo />
      </ComponentWrapper>
      <ComponentWrapper name='dropdown-menu'>
        <DropdownMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name='form'>
        <FormDemo />
      </ComponentWrapper>
      <ComponentWrapper name='hover-card'>
        <HoverCardDemo />
      </ComponentWrapper>
      <ComponentWrapper name='input'>
        <InputDemo />
      </ComponentWrapper>
      <ComponentWrapper name='input-otp'>
        <InputOTPDemo />
      </ComponentWrapper>
      <ComponentWrapper name='label'>
        <LabelDemo />
      </ComponentWrapper>
      <ComponentWrapper name='menubar'>
        <MenubarDemo />
      </ComponentWrapper>
      <ComponentWrapper name='navigation-menu'>
        <NavigationMenuDemo />
      </ComponentWrapper>
      <ComponentWrapper name='pagination'>
        <PaginationDemo />
      </ComponentWrapper>
      <ComponentWrapper name='popover'>
        <PopoverDemo />
      </ComponentWrapper>
      <ComponentWrapper name='progress'>
        <ProgressDemo />
      </ComponentWrapper>
      <ComponentWrapper name='radio-group'>
        <RadioGroupDemo />
      </ComponentWrapper>
      <ComponentWrapper name='resizable'>
        <ResizableDemo />
      </ComponentWrapper>
      <ComponentWrapper name='scroll-area'>
        <ScrollAreaDemo />
      </ComponentWrapper>
      <ComponentWrapper name='select'>
        <SelectDemo />
      </ComponentWrapper>
      <ComponentWrapper name='separator'>
        <SeparatorDemo />
      </ComponentWrapper>
      <ComponentWrapper name='sheet'>
        <SheetDemo />
      </ComponentWrapper>
      <ComponentWrapper name='skeleton'>
        <SkeletonDemo />
      </ComponentWrapper>
      <ComponentWrapper name='slider'>
        <SliderDemo />
      </ComponentWrapper>
      <ComponentWrapper name='sonner'>
        <SonnerDemo />
      </ComponentWrapper>
      <ComponentWrapper name='switch'>
        <SwitchDemo />
      </ComponentWrapper>
      <ComponentWrapper name='table'>
        <TableDemo />
      </ComponentWrapper>
      <ComponentWrapper name='tabs'>
        <TabsDemo />
      </ComponentWrapper>
      <ComponentWrapper name='textarea'>
        <TextareaDemo />
      </ComponentWrapper>
      <ComponentWrapper name='toggle'>
        <ToggleDemo />
      </ComponentWrapper>
      <ComponentWrapper name='toggle-group'>
        <ToggleGroupDemo />
      </ComponentWrapper>
      <ComponentWrapper name='tooltip'>
        <TooltipDemo />
      </ComponentWrapper>
    </div>
  )
}
