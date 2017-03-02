import test from 'ava'

test('foo', t => {
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('say bar')
  t.is(await bar, 'say bar')
})

test('deep', t => {
  t.deepEqual([1, 2], [1, 2])
})
