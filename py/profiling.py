import cProfile

import prime

prime.profiling = True
prime.run('c')

iterations = 10
runs = [
	'l 10000 {}',
	'g 10000',
	'l 50000 {}',
	'l 100000 {}'
]

def main():
	for r in runs:
		prime.cancelled = False
		for i in range(iterations):
			print(r, '- iteration', i + 1, 'of', iterations)
			prime.run('r')
			cProfile.run("prime.run('{}')".format(r))

if __name__ == '__main__':
	main()
