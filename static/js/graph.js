queue()
    .defer(d3.json, '/pbp_2017')
    .await(makeGraphs);

//Function to create a fake group that removes NA values from the original group
function removeNAValues(source_group) {
    return {
        all: function() {
            return source_group.all().filter(function(d){
                return d.key != 'NA';
            });
        }
    }
}

//Function to hide loader when page is done loading
function showPage(){
    document.getElementById('loader').style.display = 'none';
    document.getElementById('outer').style.display = 'block';
    document.getElementById('outer').style.opacity = 1;
}

//Function to return team colors as an array of hex values
function getTeamColors(team){
    //Set default color palette
    var returnColors = ['#013369','#D50A0A','#008000','#FFA500','#FFFF00'];
    var teamColors,nflColors;

    //Had to replace #FFFFFF with #DCDCDC to make white visible
    if(team) {
        teamColors = {
            'ARI': ['#97233F', '#FFB612', '#000000'],
            'ATL': ['#A71930', '#A5ACAF', '#000000'],
            'BAL': ['#241773', '#9E7C0C', '#000000'],
            'BUF': ['#00338D', '#C60C30'],
            'CAR': ['#0085CA', '#BFC0BF', '#000000'],
            'CHI': ['#F26522', '#00143F'],
            'CIN': ['#FB4F14', '#000000'],
            'CLE': ['#22150C', '#FB4F14'],
            'DAL': ['#0C264C', '#B0B7BC'],
            'DEN': ['#002244', '#FB4F14'],
            'DET': ['#046EB4', '#B0B7BC', '#000000'],
            'GB': ['#24423C', '#FCBE14'],
            'HOU': ['#00143F', '#C9243F'],
            'IND': ['#003D79', '#DCDCDC'],
            'JAX': ['#D8A328', '#136677', '#000000', '#9E7A2C'],
            'KC': ['#CA2430', '#FFB612', '#000000'],
            'LA': ['#95774C', '#002147'],
            'LAC': ['#0A2342', '#2072BA', '#FDB515'],
            'MIA': ['#0091A0', '#FF8500', '#002760'],
            'MIN': ['#4F2E84', '#FEC62F', '#000000'],
            'NE': ['#0A2342', '#C81F32', '#B0B7BD'],
            'NO': ['#A08A58', '#000000'],
            'NYG': ['#192E6C', '#B20032'],
            'NYJ': ['#203731', '#DCDCDC'],
            'OAK': ['#C4C9CC', '#000000'],
            'PHI': ['#014A53', '#BBC4C9', '#000000'],
            'PIT': ['#FFC20E', '#DA2128', '#000000', '#00529B', '#B2BABF'],
            'SF': ['#C9243F', '#C8AA76', '#000000'],
            'SEA': ['#002A5C', '#7AC142', '#B2B7BB', '#2D5980'],
            'TB': ['#D40909', '#B0B9BF', '#000000', '#FF7900'],
            'TEN': ['#4095D1', '#00295B', '#DA2128', '#BCC4C9'],
            'WAS': ['#FFC20F', '#7C1415', '#000000', '#693213']
        };

        nflColors = ['#013369', '#D50A0A'];

        returnColors = teamColors[team];

        //Fill out rest of palette if less than 5 colors
        if (returnColors.length < 5) {
            returnColors.push(nflColors[0]);
            returnColors.push(nflColors[1]);
        }

    }
    return returnColors;
}

//Sets the team logo source in html
function setTeamLogo(team){
    var logo = document.getElementById('logo');

    if (team){
        logo.src = '/static/img/'+team+'.svg';
    }
    else {
        logo.src = '/static/img/NFL.svg';
    }
}

//Sets the team website url in html
function setTeamURL(team){
    var teamURL = document.getElementById('teamURL');
    if (team){
        teamURL.href = 'http://www.'+getTeamURL(team);
    }
    else {
        teamURL.href = 'http://www.nfl.com';
    }
}

/*Temporary function to get team websites for 2017.  Need to import from database.*/
function getTeamURL(team){
    var teamURL = {
        'ARI': 'azcardinals.com',
        'ATL': 'atlantafalcons.com',
        'BAL': 'baltimoreravens.com',
        'BUF': 'buffalobills.com',
        'CAR': 'panthers.com',
        'CHI': 'chicagobears.com',
        'CIN': 'bengals.com',
        'CLE': 'clevelandbrowns.com',
        'DAL': 'dallascowboys.com',
        'DEN': 'denverbroncos.com',
        'DET': 'detroitlions.com',
        'GB': 'packers.com',
        'HOU': 'houstontexans.com',
        'IND': 'colts.com',
        'JAX': 'jaguars.com',
        'KC': 'chiefs.com',
        'LA': 'therams.com',
        'LAC': 'chargers.com',
        'MIA': 'miamidolphins.com',
        'MIN': 'vikings.com',
        'NE': 'patriots.com',
        'NO': 'neworleanssaints.com',
        'NYG': 'giants.com',
        'NYJ': 'newyorkjets.com',
        'OAK': 'raiders.com',
        'PHI': 'philadelphiaeagles.com',
        'PIT': 'steelers.com',
        'SF': '49ers.com',
        'SEA': 'seahawks.com',
        'TB': 'buccaneers.com',
        'TEN': 'titansonline.com',
        'WAS': 'redskins.com'
    };
    return teamURL[team];
}

/*Temporary function to get team websites for 2017.  Need to import from database.*/
function getTeamName(team){
    var teamName = {
        'ARI': 'Arizona Cardinals',
        'ATL': 'Atlanta Falcons',
        'BAL': 'Baltimore Ravens',
        'BUF': 'Buffalo Bills',
        'CAR': 'Carolina Panthers',
        'CHI': 'Chicago Bears',
        'CIN': 'Cincinnati Bengels',
        'CLE': 'Cleveland Browns',
        'DAL': 'Dallas Cowboys',
        'DEN': 'Denver Broncos',
        'DET': 'Detroit Lions',
        'GB': 'Green Bay Packers',
        'HOU': 'Houston Texans',
        'IND': 'Indianapolis Colts',
        'JAX': 'Jacksonville Jaguars',
        'KC': 'Kansas City Chiefs',
        'LA': 'Los Angeles Rams',
        'LAC': 'Los Angeles Chargers',
        'MIA': 'Miami Dolphins',
        'MIN': 'Minnesota Vikings',
        'NE': 'New England Patriots',
        'NO': 'New Orleans Saints',
        'NYG': 'New York Giants',
        'NYJ': 'New York Jets',
        'OAK': 'Oakland Raiders',
        'PHI': 'Philadelphia Eagles',
        'PIT': 'Pittsburg Steelers',
        'SF': 'San Francisco 49ers',
        'SEA': 'Seattle Seahawks',
        'TB': 'Tampa Bay Buccaneers',
        'TEN': 'Tennessee Titans',
        'WAS': 'Washington Redskins'
    };
    return teamName[team];
}

/*Temporary function to get bye weeks for 2017.  Need to either import from database or use groupSum
to figure out where the bye weeks are. Hint, you need to find where run and pass plays are zero for that
week.
 */
function getTeamByeWeek(team){
    var teamByeWeek = {
        'ARI': 8,
        'ATL': 5,
        'BAL': 10,
        'BUF': 6,
        'CAR': 11,
        'CHI': 9,
        'CIN': 6,
        'CLE': 9,
        'DAL': 6,
        'DEN': 5,
        'DET': 7,
        'GB': 8,
        'HOU': 7,
        'IND': 11,
        'JAX': 8,
        'KC': 10,
        'LA': 8,
        'LAC': 9,
        'MIA': 1,
        'MIN': 9,
        'NE': 9,
        'NO': 5,
        'NYG': 8,
        'NYJ': 11,
        'OAK': 10,
        'PHI': 10,
        'PIT': 9,
        'SF': 11,
        'SEA': 6,
        'TB': 1,
        'TEN': 8,
        'WAS': 5
    };
    return teamByeWeek[team];
}

//Draws the bye week dashed line as an svg line
function drawByeWeekLine (chart,bye) {
    var chartBody = chart.select('g');

    //Clear existing line
    chartBody.selectAll('#oeLine').remove();

    //Clear existing text
    chartBody.selectAll('#oeText').remove();

    if(bye) {
        var x_vert = bye;
        var extra_data = [
            {x: chart.x()(x_vert) + 62, y: 0},
            {x: chart.x()(x_vert) + 62, y: chart.effectiveHeight() + 25}
        ];
        var line = d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate('linear');

        var path = chartBody.selectAll('path.extra').data([extra_data]);

        path = path.enter()
            .append('path')
            .attr('class', 'oeExtra')
            .attr('stroke', 'red')
            .attr('id', 'oeLine')
            .attr('stroke-width', 1.5)
            .style('stroke-dasharray', ('10,4'));

        path.attr('d', line);

        var text = chartBody.selectAll('#oeLine')
            .data(extra_data)
            .enter()
            .append('text');

        var textLabel = text
            .attr('x',function(d){return d.x+7})
            .attr('y',function(d){return d.y-chart.effectiveHeight()-10})
            .attr('id','oeText')
            .text(function(d){return 'Bye Week';})
            .attr('font-family','Carrois Gothic SC')
            .attr('font-size','11px')
            .attr('fill','red');
    }
}

//Creates all graphs and charts
function makeGraphs(error, nflData2017) {
    if (error) {
        console.error('makeGraphs error on receiving dataset:', error.statusText);
        throw error;
    }

    //Create a Crossfilter instance
    var ndx = crossfilter(nflData2017);

    //Define Dimensions
    var weekDim = ndx.dimension(function (d) {
        return d.Week;
    });
    var quarterDim = ndx.dimension(function (d) {
           return d.qtr;
    });
    var passLocationDim = ndx.dimension(function (d) {
        return d.PassLocation;
    });
    var runLocationDim = ndx.dimension(function (d) {
        return d.RunLocation;
    });
    var runGapDim = ndx.dimension(function (d) {
        return d.RunGap;
    });
    var passOutcomeDim = ndx.dimension(function (d) {
        return d.PassOutcome;
    });
    var positionDim = ndx.dimension(function (d) {
        return d.Position;
    });
    var downDim = ndx.dimension(function (d) {
       return d.down;
    });
    var offenseTeamDim = ndx.dimension(function (d) {
        return d.posteam;
    });
    var playTypeDim = ndx.dimension(function (d) {
        return d.PlayType;
    });

    //Calculate metrics
    var totalYardsByWeekGroupSum = weekDim.group().reduceSum(function(d) { return d.YardsGained });
    var numRunPlaysByWeekGroupSum = weekDim.group().reduceSum(function(d) {return d.PlayType=='Run'});
    var numPassPlaysByWeekGroupSum = weekDim.group().reduceSum(function(d) {return d.PlayType=='Pass'});
    var quarterGroup = quarterDim.group();
    var passLocationGroupSum = passLocationDim.group().reduceSum(function(d) {return d.PlayType=='Pass'});
    var filteredPassLocationGroup = removeNAValues(passLocationGroupSum);
    var runLocationGroupSum = runLocationDim.group().reduceSum(function(d) {return d.PlayType=='Run'});
    var filteredRunLocationGroup = removeNAValues(runLocationGroupSum);
    var runGapGroupGroupSum = runGapDim.group().reduceSum(function(d) {return d.PlayType=='Run'});
    var passOutcomeGroupSum = passOutcomeDim.group().reduceSum(function(d) {return d.PlayType=='Pass'});
    var filteredPassOutcomeGroup = removeNAValues(passOutcomeGroupSum);
    var offenseTeamGroup = offenseTeamDim.group();
    var positionGroupSum = positionDim.group().reduceSum(function(d) {return d.PlayType=='Pass'});
    var downGroup = downDim.group();
    var playTypeGroup = playTypeDim.group();

    var all = ndx.groupAll();
    var totalYards = ndx.groupAll().reduceSum(function (d) {
        return d.YardsGained;
    });

    var avgYardsGroup = ndx.groupAll().reduce(
        function(p,v) {
            ++p.count;
            p.total += v.YardsGained;
            return p;
        },
        function(p,v) {
            --p.count;
            p.total -= v.YardsGained;
            return p;
        },
        function() {
            return {
                count: 0,
                total: 0
            };
        }
    );
    var avg = function(d){
      return d.count ? d.total/d.count : 0;
    };

    //Define first week and last week to be used in line charts
    var minWeek = weekDim.bottom(1)[0]['Week'];
    var maxWeek = weekDim.top(1)[0]['Week'];

    //Default colors
    var colorScheme = ['#013369','#D50A0A','#008000','#FFA500','#FFFF00'];
    var currentTeam = null;

    //Charts
    playsChart = dc.compositeChart('#plays-chart');
    yardsChart = dc.lineChart('#yards-chart');
    passLocationChart = dc.rowChart('#pass-location-row-chart');
    numberPlaysND = dc.numberDisplay('#number-plays-nd');
    totalYardsND = dc.numberDisplay('#total-yards-nd');
    avgYardsND = dc.numberDisplay('#avg-yards-nd');
    passOutcomeChart = dc.pieChart('#complete-chart');
    passToPositionChart = dc.pieChart('#position-chart');
    downChart = dc.rowChart('#down-row-chart');
    quarterChart = dc.rowChart('#quarter-row-chart');
    playTypeChart = dc.rowChart('#playtype-row-chart');
    runLocationChart = dc.rowChart('#run-location-row-chart');
    runGapChart = dc.rowChart('#run-gap-row-chart');
    offensiveTeamSelectField = dc.selectMenu('#team-menu-select');
    passOrRushSelectField = dc.selectMenu('#pass-or-rush-menu-select');

    offensiveTeamSelectField
        .height(100)
        .dimension(offenseTeamDim)
        .group(offenseTeamGroup)
        .useViewBoxResizing(true)
        .title(function(d) {return getTeamName(d.key) + " (" + d.key + ")";});

    passOrRushSelectField
        .height(100)
        .dimension(playTypeDim)
        .group(playTypeGroup)
        .useViewBoxResizing(true)
        .on('pretransition', function(passOrRushSelectField) {
                //if pass toggle/hide run
                var currentState = passOrRushSelectField.filters();
                if (currentState == 'Pass'){
                    $('#runRow').hide();
                    $('#passRow').show();
                } else if (currentState == 'Run') {
                    $('#passRow').hide();
                    $('#runRow').show();
                } else {
                    $('#passRow').show();
                    $('#runRow').show();
                }
        })
        .title(function(d) {return d.key;});

    numberPlaysND
        .formatNumber(d3.format('d'))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalYardsND
        .formatNumber(d3.format('d'))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalYards);

    avgYardsND
        .formatNumber(d3.format('.3g'))
        .valueAccessor(avg)
        .group(avgYardsGroup);

    playsChart
        .height(250)
        .margins({top: 30, right: 20, bottom: 30, left: 50})
        .dimension(weekDim)
        .transitionDuration(500)
        .x(d3.scale.linear().domain([minWeek, maxWeek]))
        .xAxisLabel('Week')
        .yAxisLabel('Total Plays')
        .elasticY(true)
        .useViewBoxResizing(true)
        .brushOn(false)
        .legend(dc.legend()
            .legendText(function (d,i) {
                legendArray = ['Run','Pass'];
                return legendArray[i];
            })
            .horizontal(false)
            .x(1)
            .y(5)
        )
        .compose([
            dc.lineChart(playsChart)
                .group(numRunPlaysByWeekGroupSum)
                .ordinalColors(colorScheme)
                .renderArea(false)
                .xyTipsOn(true),
            dc.lineChart(playsChart)
                .group(numPassPlaysByWeekGroupSum)
                .ordinalColors(colorScheme)
                .renderArea(false)
                .xyTipsOn(true)
        ])
        .on('preRedraw', function(playsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            var i=0;
            playsChart.children().forEach(function(child){
                child.ordinalColors([getTeamColors(currentTeam)[i]]);
                i++;
            });
        })
        .on('preRender', function(playsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            var i=0;
            playsChart.children().forEach(function(child){
                child.ordinalColors([getTeamColors(currentTeam)[i]]);
                i++;
            });
        })
        .on('pretransition', function(playsChart){
            currentTeam = offensiveTeamSelectField.filters()[0];
            //Important: Drawing the bye week only works in the pretransition in this case.
            drawByeWeekLine(playsChart,getTeamByeWeek(currentTeam));
        })
        .yAxis().ticks(5);

    playsChart.renderVerticalGridLines(true);
    playsChart.xAxis().ticks(maxWeek);

    yardsChart
        .ordinalColors(colorScheme)
        .height(250)
        .margins({top: 30, right: 20, bottom: 30, left: 50})
        .dimension(weekDim)
        .group(totalYardsByWeekGroupSum)
        .xyTipsOn(true)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.scale.linear().domain([minWeek, maxWeek]))
        .elasticY(true)
        .useViewBoxResizing(true)
        .brushOn(false)
        .xAxisLabel('Week')
        .yAxisLabel('Total Yards')
        .on('preRedraw', function(yardsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            yardsChart.ordinalColors(getTeamColors(currentTeam));
            setTeamLogo(currentTeam);
            setTeamURL(currentTeam);
        })
        .on('pretransition', function(yardsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            yardsChart.ordinalColors(getTeamColors(currentTeam));
            drawByeWeekLine(yardsChart,getTeamByeWeek(currentTeam));
        })
        .on('preRender', function(yardsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            yardsChart.ordinalColors(getTeamColors(currentTeam));
        })
        .yAxis().ticks(5);

    yardsChart.renderVerticalGridLines(true);
    yardsChart.xAxis().ticks(maxWeek);

    passLocationChart
        .ordinalColors(colorScheme)
        .height(250)
        .margins({top: 10, right: 10, bottom: 20, left: 40})
        .dimension(passLocationDim)
        .group(filteredPassLocationGroup)
        .labelOffsetX(-40)
        .ordering(function(d){
            if(d.key == 'left') return 0;
            else if (d.key == 'middle') return 1;
            else if (d.key == 'right') return 2;
            else return 3;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    downChart
        .ordinalColors(colorScheme)
        .height(250)
        .dimension(downDim)
        .group(downGroup)
        .labelOffsetX(-20)
        .ordering(function(d){
            if(d.key == '1') return 0;
            else if (d.key == '2') return 1;
            else if (d.key == '3') return 2;
            else return 4;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(downChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
            })
        .on('preRedraw',function(downChart){
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender',function(downChart){
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    quarterChart
        .ordinalColors(colorScheme)
        .height(250)
        .dimension(quarterDim)
        .group(quarterGroup)
        .labelOffsetX(-20)
        .ordering(function(d){
            if(d.key == '1') return 0;
            else if (d.key == '2') return 1;
            else if (d.key == '3') return 2;
            else if (d.key == '4') return 3;
            else return 4;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(quarterChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
            })
        .on('preRedraw',function(quarterChart){
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender',function(quarterChart){
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    playTypeChart
        .ordinalColors(colorScheme)
        .width(300)
        .height(300)
        .dimension(playTypeDim)
        .group(playTypeGroup)
        .elasticX(true)
        .on('pretransition', function(playTypeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            playTypeChart.ordinalColors(getTeamColors(currentTeam));
            })
        .xAxis().ticks(3);

    runLocationChart
        .ordinalColors(colorScheme)
        .height(250)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .dimension(runLocationDim)
        .group(filteredRunLocationGroup)
        .elasticX(true)
        .useViewBoxResizing(true)
        .labelOffsetX(-40)
        .on('pretransition', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    runGapChart
        .ordinalColors(colorScheme)
        .height(250)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .dimension(runGapDim)
        .group(runGapGroupGroupSum)
        .elasticX(true)
        .useViewBoxResizing(true)
        .labelOffsetX(-40)
        .on('pretransition', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    passOutcomeChart
        .ordinalColors(colorScheme)
        .height(250)
        .radius(170)
        .innerRadius(25)
        .transitionDuration(1500)
        .dimension(passOutcomeDim)
        .group(filteredPassOutcomeGroup)
        .legend(dc.legend()
            .legendText(function (d) {return d.name;})
            .x(0)
            .y(5)
        )
        .useViewBoxResizing(true)
        .on('pretransition', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .on('preRender', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .on('preRedraw', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        });

    passToPositionChart
        .ordinalColors(colorScheme)
        .height(250)
        .radius(170)
        .innerRadius(25)
        .transitionDuration(1500)
        .dimension(positionDim)
        .group(positionGroupSum)
        .slicesCap(3)
        .useViewBoxResizing(true)
        .legend(dc.legend()
            .legendText(function (d) { return d.name; })
            .x(0)
            .y(5)
        )
        .on('pretransition', function(passToPositionChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                if (d.endAngle - d.startAngle > .5) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
        })
        .on('preRender', function(passToPositionChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                if (d.endAngle - d.startAngle > .5) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
        })
        .on('preRedraw', function(passToPositionChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                if (d.endAngle - d.startAngle > .375) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
         });

    dc.renderAll();
    showPage();
}