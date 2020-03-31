import math
from os import system, name

cancelled = False
primes = [2, 3]
profiling = False
int_parsers = {
	'int': lambda args: args,
	'list': lambda args: parse_int(args[0]),
	'str': lambda args: eval(args)
}

def add_prime(n):
	if not n in primes:
		primes.append(n)
	primes.sort()

def factorize(args):
	n = parse_int(args)
	if is_prime(n):
		if not profiling:
			print(n, 'is prime')
		return
	factors = []
	remain = n
	for i in range(2, int(math.sqrt(n)) + 1):
		factor = [i, 0]
		while remain % i == 0:
			factor[1] += 1
			remain /= i
		if factor[1] > 0:
			factors.append(factor)
			add_prime(i)
	if remain > 2:
		factors.append([int(remain), 1])
		add_prime(int(remain))
	if not profiling:
		print(n, '=', ','.join(['{}^{}'.format(*f) for f in factors if f]))

def get_prime(i):
	n = primes[-1] + 2
	if i < 0:
		i = len(primes)
	while len(primes) <= i:
		is_prime(n)
		n += 2
	return primes[i]

def help(n):
	print()
	print('c[lear]           clear screen')
	print('h[elp]            shows this help message')
	print('l[oop]            runs commands in a loop')
	print('g[et]             gets next n primes')
	print('p[rimes]          list primes')
	print('q[uit]            quit/exit')
	print()

def is_prime(n):
	if n < 2:
		return False
	if n in primes:
		return True
	for i in range(2, int(math.sqrt(n)) + 1):
		if n % i == 0:
			return False
	add_prime(n)
	return True

def loop(args):
	for i in range(parse_int(args[0])):
		run(' '.join(args[1:]).format(i).replace(',', ';'))
		if cancelled:
			break

def parse_int(args):
	type_str = str(type(args))[8:-2]
	try:
		return int_parsers[type_str](args)
	except Exception as e:
		return 0

def reset(args=[]):
	global primes
	primes = [2, 3]

def run(resp):
	global cancelled, commands
	try:
		for c in resp.split(';'):
			args = c.split(' ')
			if args[0][0] in commands.keys():
				commands[args[0][0]](args[1:])
			else:
				num = parse_int(args)
				if num < 2:
					if not profiling:
						print(num, 'Please try a larger number')
				else:
					factorize(num)
	except KeyboardInterrupt:
		cancelled = True
		if not profiling:
			print('Cancelled')

commands = {
	'c': lambda args: system('cls' if name == 'nt' else 'clear'),
	'g': lambda args: get_prime(parse_int(args) + len(primes)),
	'h': help,
	'l': loop,
	'p': lambda args: print(primes[parse_int(args):]),
	'q': lambda args: quit(),
	'r': reset
}

if __name__ == '__main__':
	run('c')
	print('type "help" for a list of commands')
	print()
	while True:
		cancelled = False
		resp = input('prime>')
		if resp:
			run(resp)
