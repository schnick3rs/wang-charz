<script lang=js>
export default {
  name: 'ContentfulHtmlText',
  props: {
    html: String,
  },
  methods: {
    parseHtml(html) {
      let finalHtml = this.parseForInternalLinks(html);
      finalHtml = this.parseForShortcodes(finalHtml);
      return finalHtml;
    },
    parseForInternalLinks(html){
      let result = html;
      result = result.replace(/<(a)\shref="\/([^"]*)">([^<]*)(<\/\1>)/gm, `<nuxt-link to="/$2">$3</nuxt-link>`);
      result = result.replace(/<(a)\shref=https:\/\/doctors-of-doom.com\/([^"]*)">([^<]*)(<\/\1>)/gm, `<nuxt-link to="/$2">$3</nuxt-link>`);
      return result;
    },
    parseForShortcodes(html) {
      return html.replace(/{([\w/-]+)#([\w\s-]+)}/mg, `<hint-box endpoint="$1" label="$2"/>`);
    },
  },
  render(h) {
    const template = this.parseHtml(this.html);
    return h({
      template: `<div class="markdown-html-text">${template}</div>`,
    });
  },
};
</script>

<style lang="scss">

.markdown-html-text {

  & ul,ol {
    margin-bottom: 16px !important;
  }

  & code {
    color: hsl(122 39% 49%);
    background-color: transparent;
  }

  & blockquote {

    background-color: lightyellow;
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 300;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
    margin-top: 8px;
    margin-bottom: 16px;

    & p {
      //padding: 12px 12px 12px 24px;
      font-size: 18px;
      font-weight: 300;
      margin: 0;
    }

  }

}

</style>
