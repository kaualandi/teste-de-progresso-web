import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { QUESTION_TABS } from '@app/constants/questions';
import { QuestionService } from './../../../services/question.service';

@Component({
  selector: 'app-questions-page-settings',
  templateUrl: './questions-page-settings.component.html',
  styleUrls: ['./questions-page-settings.component.scss'],
})
export class QuestionsPageSettingsComponent implements OnInit {
  constructor(private questionService: QuestionService) {}

  originalQuestionTabs = [...QUESTION_TABS];
  questionTabs = [...this.originalQuestionTabs];
  canRevert = false;

  ngOnInit(): void {
    const tabsOrder = this.questionService.questionTabsOrder;
    if (tabsOrder.length) {
      this.questionTabs = tabsOrder.map(
        (tab) => this.questionTabs.find((t) => t.value === tab)!
      );

      const tabsValues = this.questionTabs.map((tab) => tab.value);
      const originalValues = QUESTION_TABS.map((tab) => tab.value);
      this.canRevert = !tabsValues.some(
        (tab, index) => originalValues[index] !== tab
      );
    }
  }

  saveTabsOrder() {
    const tabsValues = this.questionTabs.map((tab) => tab.value);
    const originalValues = QUESTION_TABS.map((tab) => tab.value);
    this.questionService.questionTabsOrder = tabsValues;
    this.canRevert = !tabsValues.some(
      (tab, index) => originalValues[index] !== tab
    );
  }

  handleRevertButtonClick() {
    this.questionTabs = [...this.originalQuestionTabs];
    this.saveTabsOrder();
  }

  drop(event: CdkDragDrop<typeof this.questionTabs>) {
    moveItemInArray(this.questionTabs, event.previousIndex, event.currentIndex);
    this.saveTabsOrder();
  }
}
