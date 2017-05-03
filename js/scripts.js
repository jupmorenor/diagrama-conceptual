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
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('x', function(d){return d.x})
    .attr('y', function(d){return d.y});
  grupo.on('mousedown', seleccionar)
    .on('mouseup', deseleccionar)
    .call(arrastrar);
}

function seleccionar(d, i) {
  if (d3.event.defaultPrevented) return;
  d3.select(this)
  .attr('transform', 'translate('+d.x+','+d.y+')')
  .select('circle').transition()
  .style('fill', 'gray');
}

function deseleccionar(d, i) {
  if (d3.event.defaultPrevented) return;
  d3.select(this).select('circle').transition()
  .style('fill', 'white');
}

function arrastrar() {
  return;
}
