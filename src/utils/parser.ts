/** Markdown parcer by @mrHoft
 * Supports:
 * # h1
 * ## h2
 * ### h3
 * unnamed list
 * <img>
 * <b>, <i>, <u>
 * [link](url)
 * <hr>
 */

type TLinkParts = {
  str: string;
  id?: string;
  url?: string;
};

function checkLink(text: string) {
  const arr: TLinkParts[] = [];
  function checker(str: string) {
    const match = str.match(/\[([\w\s\d./?=<>"-]+)\]\(([https?://]*[\w\d./?=#@-]+)\)/);
    if (match && match.index !== undefined) {
      const id = match[1];
      const url = match[2];
      arr.push({ str: str.slice(0, match.index), id, url });
      checker(str.substring(match.index + id.length + url.length + 4));
    } else if (arr.length) arr.push({ str });
  }
  checker(text);

  const res: (HTMLElement | Text)[] = [];
  if (arr.length) {
    arr.forEach(({ str, id, url }) => {
      res.push(document.createTextNode(str));
      if (id && url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        const nodes = checkTransforms(id);
        if (nodes.length) a.append(...nodes);
        else a.textContent = id;
        res.push(a);
      }
    });
  }
  return res;
}

function splitText(text: string) {
  function split(str: string): string[] {
    const match = str.match(/<[^>]+>[^<]*<\/[^>]+>/);
    if (match && match.index !== undefined) {
      return [str.slice(0, match.index), match[0], ...split(str.slice(match.index + match[0].length))];
    }
    return [str];
  }
  return split(text);
}

function checkTransforms(text: string) {
  const tags = ['<img>', '<b>', '<i>', '<u>'];
  const parts = splitText(text);

  const res: (HTMLElement | Text)[] = [];
  parts.forEach((str) => {
    let added = false;
    for (let i = 0; i < tags.length; i += 1) {
      const tag = tags[i];
      if (str.startsWith(tag.slice(0, tag.length - 1))) {
        const tagName = tag.slice(1, -1);
        const el = document.createElement(tagName);
        res.push(el);
        if (tagName === 'img') {
          const img = el as HTMLImageElement;
          const match = str.match(/src\s*=\s*"([^"]+)"/);
          if (match) img.src = match[1];
          img.alt = '';
          const after = str.slice(str.indexOf('>') + 1);
          const linkNodes = checkLink(after);
          if (linkNodes.length) res.push(...linkNodes);
          else res.push(document.createTextNode(after));
        } else {
          el.textContent = str.slice(str.indexOf('>') + 1, -tag.length - 1);
        }
        added = true;
        break;
      }
    }
    if (!added) {
      let regular = str;
      if (str.startsWith('<')) {
        const tagEnd = str.indexOf('>') + 1;
        regular = str.slice(tagEnd, -tagEnd - 1);
      }
      const linkNodes = checkLink(regular);
      if (linkNodes.length) res.push(...linkNodes);
      else res.push(document.createTextNode(regular));
    }
  });

  return res;
}

class Parser {
  private ulElements: HTMLLIElement[] = [];
  private divElement: HTMLDivElement | null = null;

  public parseLine(line: string | null) {
    const res: (HTMLElement | Text)[] = [];

    if (line && line.trimStart().startsWith('- ')) {
      const li = document.createElement('li');
      const text = line.slice(2).trimStart();
      const linkNodes = checkLink(text);
      if (linkNodes.length) li.append(...linkNodes);
      else li.textContent = text;
      this.ulElements.push(li);
      return res;
    }

    if (this.ulElements.length) {
      const ul = document.createElement('ul');
      ul.append(...this.ulElements);
      this.ulElements = [];
      res.push(ul);
    }

    if (line === null) return res;
    const str = line.trim();

    if (str.startsWith('<div')) {
      this.divElement = document.createElement('div');
      const match = str.match(/class\s*=\s*"([^"]+)"/);
      if (match) this.divElement.className = match[1];
      return [];
    }
    if (this.divElement && str.startsWith('</div>')) {
      res.push(this.divElement);
      this.divElement = null;
      return res;
    }

    if (str.startsWith('<hr')) {
      const hr = document.createElement('hr');
      if (this.divElement) this.divElement.append(hr);
      else res.push(hr);
      return res;
    }

    if (!str.length) {
      const br = document.createElement('br');
      if (this.divElement) this.divElement.append(br);
      else res.push(br);
      return res;
    }

    if (str.startsWith('# ')) {
      const h = document.createElement('h1');
      h.textContent = str.substring(2);
      if (this.divElement) this.divElement.append(h);
      else res.push(h);
      return res;
    }
    if (str.startsWith('## ')) {
      const h = document.createElement('h2');
      h.textContent = str.substring(3);
      if (this.divElement) this.divElement.append(h);
      else res.push(h);
      return res;
    }
    if (str.startsWith('### ')) {
      const h = document.createElement('h3');
      h.textContent = str.substring(4);
      if (this.divElement) this.divElement.append(h);
      else res.push(h);
      return res;
    }

    const nodes = checkTransforms(str);
    if (nodes.length) {
      const p = document.createElement('p');
      p.append(...nodes);
      if (this.divElement) this.divElement.append(p);
      else res.push(p);
      return res;
    }

    const p = document.createElement('p');
    p.textContent = str;
    if (this.divElement) this.divElement.append(p);
    else res.push(p);
    return res;
  }
}

export default function parse(text: string) {
  const parser = new Parser();
  const data = text.trimEnd().split('\n');
  const fragment = document.createDocumentFragment();
  data.forEach((line) => {
    fragment.append(...parser.parseLine(line));
  });
  fragment.append(...parser.parseLine(null));
  return fragment;
}
