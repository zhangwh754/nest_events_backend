export class CreateEventsDto {
  name: string
  description: string
  when: string
  address: string
}
export type UpdateEventsDto = Partial<CreateEventsDto>
