/// <reference path="../../../dependency/typings/reference.d.ts" />

import {Definition} from '../Definition';
import {Template} from 'twig';

import twig = require('twig');

require('should');

suite('twig markdown', function () {
    twig.extend(Definition);

    test('compile markdown with a relative path to the current working directory', function () {
        var template:Template = twig.twig({data: "{% markdown './test/markdown.md' %}NOT FOUND!{% endmarkdown %}"});
        template.render().should.equal('<h1 id="foo">foo</h1>\n<p>bar</p>\n');
    });

    test('fallback to block contents if markdown is not found at the given path', function () {
        var template:Template = twig.twig({data: "{% markdown 'null.md' %}NOT FOUND!{% endmarkdown %}"});
        template.render().should.equal('<p>NOT FOUND!</p>\n');
    });

    test('compile markdown in the block', function () {
        var template:Template = twig.twig({data: "{% markdown %}# Foo{% endmarkdown %}"});
        template.render().should.equal('<h1 id="foo">Foo</h1>\n');
    });

    // test('compile markdown using path without a closing tag', function () {
    //     var template:Template = twig.twig({data: "{% markdown './test/markdown.md' %}"});
    //     template.render().should.equal('<h1 id="foo">foo</h1>\n<p>bar</p>\n');
    // });
});