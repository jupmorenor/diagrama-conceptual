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
