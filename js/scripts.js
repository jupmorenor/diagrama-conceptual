var espacio = d3.select('svg');
var mousepos = 0

espacio.on('dblclick', function() {
  mousepos = d3.mouse(this);
  agregarConcepto(mousepos);
});

function agregarConcepto(mousepos) {
  var grupo = espacio.append('g')
    .data([{'t':'Nuevo concepto', 'x':mousepos[0], 'y':mousepos[1]}]);
  grupo.append('circle')
    .attr('r', 50)
    .attr('cx', function(d){return d.x})
    .attr('cy', function(d){return d.y})
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    .attr('fill', 'white');
  grupo.append('text')
    .text(function(d){return d.t;})
    .attr('class', 'texto')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y});
    //.call(editar_texto, 'texto');
  grupo.call(d3.drag()
    .on('start', seleccionar)
    .on('drag', arrastrar)
    .on('end', deseleccionar));
}

function seleccionar(d, i) {
  if (d3.event.defaultPrevented) return;
  d3.select(this)
    .select('circle').transition()
    .style('fill', 'gray');
}

function deseleccionar(d, i) {
  if (d3.event.defaultPrevented) return;
  d3.select(this)
    .select('circle').transition()
    .style('fill', 'white');
}

function arrastrar(d) {
  d3.select(this).select('circle')
    .attr('cx', d.x = d3.event.x)
    .attr('cy', d.y = d3.event.y); 
  d3.select(this).select('text')
    .attr('x', d.x = d3.event.x)
    .attr('y', d.y = d3.event.y);
}

function editar_texto(d, campo) {
  //revisar seleccion del elemento correcto
  console.log('texto', arguments);
  d3.select(this).select('text').on('click', function(d){
    var parent = this.parentNode;
    var xy = d3.select(this).getBBox();
    var p_xy = parent.getBBox();
    xy.x -= p_xy.x;
    xy.y -= p_xy.y;
    var p_el = d3.select(parent);
    var elem = d3.select(this);
    var editable = p_el.append('foreignObject');
    var inp = editable
      .attr('x', xy.x)
      .attr('y', xy.y)
      .attr("width", 300)
      .attr("height", 25)
      .append('xhtml:form')
        .append('input')
        .attr('value', function() {
          this.focus();
          return d[campo]
        }).attr('style', 'width: 294px;')
        .on('blur', function() {
          var txt = inp.node().value;
          d[campo] = txt;
          elem.text(function(d){ return d[campo]; });
          p_el.select('foreignObject').remove();
        }).on('keypress', function() {
          var ev = d3.event;
          if (ev.keyCode == 13) {
            if(typeof(ev.cancelBubble) !== 'undefined')
              ev.cancelBubble = true;
            if (ev.stopPropagation)
              ev.stopPropagation();
            ev.preventDefault();
            var txt = inpp.node().value;
            d[campo] = txt;
            elem.text(function(d){ return d[campo]; });
            p_el.select('foreignObject').remove();
          }
        })
  });

}
