const addAcento = (texto) => {
  if (texto !== undefined) {
    if (texto.includes('�')) {
      texto = texto
        .replaceAll('i�n', 'ión')
        .replaceAll('t�s', 'tís')
        .replaceAll('m�s', 'mús')
        .replaceAll('g�a', 'gía')
        .replaceAll('e�o', 'eño')
        .replaceAll('n�l', 'nál')
        .replaceAll('r�f', 'ráf')
        .replaceAll('r�n', 'rón')
        .replaceAll('l�g', 'lág')
        .replaceAll('l�s', 'lás')
        .replaceAll('f�s', 'fís')
        .replaceAll('m�t', 'mát')
        .replaceAll('u�m', 'uím')
        .replaceAll('n�m', 'nám')
        .replaceAll('r�c', 'rác')
        .replaceAll('3�', '3°')
        .replaceAll('l�t', 'lít')
        .replaceAll('2�', '2°')
        .replaceAll('f�a', 'fía')
        .replaceAll('m�a', 'mía')
        .replaceAll('1�', '1°')
        .replaceAll('p�b', 'púb')
        .replaceAll('t�c', 'téc')
        .replaceAll('g�g', 'góg')
        .replaceAll('e�a', 'eña')
        .replaceAll('n�t', 'nét')
        .replaceAll('l�c', 'léc')
        .replaceAll('t�r', 'tér')
        .replaceAll('a�o', 'año')
        .replaceAll('4�', '4°')
        .replaceAll('5�', '5°')
        .replaceAll('6�', '6°')
        .replaceAll('7�', '7°')
        .replaceAll('t�t', 'tát')
        .replaceAll('e�as', 'eñas')
        .replaceAll('pa�an', 'pañan')
        .replaceAll('m�q', 'máq');
    }
    return texto;
  } else {
    return "hola";
  }
};

export default addAcento;
