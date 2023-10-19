import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({
    comment: 'Auto-increment ID',
  })
  id: number

  @Column({
    comment: '',
  })
  username: string

  @Column({
    comment: '',
  })
  password: string

  @Column('bigint', {
    comment: 'datetime',
  })
  createdAt?: number

  @Column('bigint', {
    comment: 'datetime',
  })
  updatedAt?: number
}
