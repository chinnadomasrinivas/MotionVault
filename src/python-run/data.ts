/** REAL output of:  def add(a, b): return a + b ;  dis.dis(add)   (captured with Python 3.13.17).
 *  Other Python versions print slightly different opcodes (e.g. LOAD_FAST a / LOAD_FAST b on <= 3.12). */
export const DIS_LINES = [
  '  3           RESUME                   0',
  '',
  '  4           LOAD_FAST_LOAD_FAST      1 (a, b)',
  '              BINARY_OP                0 (+)',
  '              RETURN_VALUE',
];
export const ADD_SRC = ['import dis', '', 'def add(a, b):', '    return a + b', '', 'dis.dis(add)'];
