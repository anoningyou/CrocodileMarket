import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TreeElement } from 'src/app/interfaces/tree-element';
import { MocksService } from 'src/app/services/mocks.service';

@Component({
  selector: 'app-types-tree',
  templateUrl: './types-tree.component.html',
  styleUrls: ['./types-tree.component.scss']
})
export class TypesTreeComponent implements OnInit {

  data: TreeElement []  = [];

  constructor(private mocksService: MocksService,
              private toastr: ToastrService){}

  //#region event handlers

  ngOnInit(): void {
    this.mocksService.getReptiliesTree().subscribe((data) => {
      this.data = data;
    })
  }

  

  onElementChange(element: TreeElement) {
    this.toastr.success(`You have changed your choise in category ${element.name}`)
  }

  //#endregion

}
