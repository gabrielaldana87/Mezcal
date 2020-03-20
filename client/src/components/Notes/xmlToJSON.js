
const test = xml => {
  var regex = /(<\w+[^<]*?)\s+([\w-]+)="([^"]+)">/;
  xml = xml
    .replace(regex, '<$2>$3</$2>$1>')
    .replace(/< *(\w[\w-]+\b)[^>]*?>/g, '{"$1":"')
    .replace(/< *\/ *\w[\w-]+ *>/g, '"}')
  ;
  return xml
};

export default test;