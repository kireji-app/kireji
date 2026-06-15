return STRING
 .replaceAll(/&/g, '&amp;')
 .replaceAll(/"/g, '&quot;')
 .replaceAll(/'/g, '&#39;')
 .replaceAll(/</g, '&lt;')
 .replaceAll(/>/g, '&gt;')