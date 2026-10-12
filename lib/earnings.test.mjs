import assert from 'node:assert/strict'
import { test } from 'node:test'
import { calculateDay, parseDayForm, professions, makeDayReport } from './earnings.ts'

const example = professions.moto.example
const formOf = (values) => Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)]))

test('moto-kurye örneğinde masrafları ve net kazancı doğru hesaplar', () => {
  const result = calculateDay(example)
  assert.equal(result.expenses, 910)
  assert.equal(result.net, 1840)
  assert.equal(result.perHour, 230)
  assert.equal(result.perJob, 57.5)
})

test('para toplamını kuruş hassasiyetinde hesaplar', () => {
  const day = { revenue: 1, fuel: 0.1, maintenance: 0.2, insurance: 0, food: 0, other: 0, hours: 1, jobs: 1 }
  assert.equal(calculateDay(day).expenses, 0.3)
  assert.equal(calculateDay(day).net, 0.7)
})

test('zararı sıfıra yuvarlamaz ve sıfıra bölmez', () => {
  const result = calculateDay({ ...example, revenue: 0, hours: 0, jobs: 0 })
  assert.equal(result.net, -910)
  assert.equal(result.perHour, null)
  assert.equal(result.perJob, null)
  assert.equal(result.expenseRatio, null)
})

test('Türkçe ondalık tutarları kabul eder', () => {
  const result = parseDayForm({ ...formOf(example), revenue: '2750,50', hours: '8,5' })
  assert.deepEqual(result.errors, {})
  assert.equal(result.values.revenue, 2750.5)
  assert.equal(result.values.hours, 8.5)
})

test('negatif, eksik, taşan ve geçersiz girişleri reddeder', () => {
  const { errors } = parseDayForm({ ...formOf(example), revenue: '-4', fuel: '', hours: '25', jobs: '2,5', food: 'Infinity', other: '1000001', insurance: '1e5' })
  for (const key of ['revenue', 'fuel', 'hours', 'jobs', 'food', 'other', 'insurance']) assert.ok(errors[key])
})

test('doğrudan geçersiz hesaplama çağrıları engellenir', () => {
  assert.throws(() => calculateDay({ ...example, revenue: NaN }), RangeError)
  assert.throws(() => calculateDay({ ...example, fuel: -1 }), RangeError)
  assert.throws(() => calculateDay({ ...example, jobs: 2.5 }), RangeError)
})

test('her meslek örneği geçerlidir ve indirilen rapor gerçek hesabı içerir', () => {
  for (const profile of Object.values(professions)) assert.deepEqual(parseDayForm(formOf(profile.example)).errors, {})
  assert.match(makeDayReport(example, 'moto'), /1\.840,00/)
  assert.match(makeDayReport(example, 'moto'), /Vergi/)
})
