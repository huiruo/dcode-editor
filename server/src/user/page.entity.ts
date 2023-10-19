import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'page' })
export class Page {
  @PrimaryGeneratedColumn({
    comment: 'Auto-increment ID',
  })
  id: number

  @Column({
    comment: '',
  })
  name: string

  @Column({
    comment: '',
  })
  descr: string

  @Column({
    comment: '',
  })
  img: string

  @Column({
    comment: '',
    type: 'longtext',
  })
  pageText: string

  @Column({
    comment: '',
  })
  status: number

  @Column('bigint', {
    comment: 'datetime',
  })
  createdAt?: number

  @Column('bigint', {
    comment: 'datetime',
  })
  updatedAt?: number
}