import { CreateAttendeeDto } from './create-attendee.dto'

export type UpdateAttendeeDto = Pick<CreateAttendeeDto, 'name'>
